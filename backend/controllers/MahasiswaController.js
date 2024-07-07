import Mahasiswa from "../models/MahasiswaModel.js";
import path from "path";
import Users from "../models/UserModel.js";
import fs from "fs";
import { Op } from "sequelize";
import Kamar from "../models/KamarModel.js";

export const getMahasiswa = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Mahasiswa.findAll({
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Kamar,
          },
        ],
      });
    } else {
      response = await Mahasiswa.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Kamar,
            attributes: ["nomor_kamar", "id"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllMahasiswa = async (req, res) => {
  try {
    let response;
    response = await Mahasiswa.findAll({
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Kamar,
          attributes: ["nomor_kamar", "id"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMahasiswaById = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!mahasiswa)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Mahasiswa.findOne({
        where: {
          id: mahasiswa.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Mahasiswa.findOne({
        where: {
          [Op.and]: [{ id: mahasiswa.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMahasiswa = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "Tidak ada file yang diunggah" });

  const {
    nama,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    email,
    no_hp,
    alamat_asal,
    universitas,
    jurusan,
    angkatan,
    jenjang,
  } = req.body;
  const { ktp, kartu_keluarga, surat_ket_aktif_kuliah } = req.files;
  if (
    !nama ||
    !jenis_kelamin ||
    !tempat_lahir ||
    !tanggal_lahir ||
    !email ||
    !no_hp ||
    !alamat_asal ||
    !universitas ||
    !jurusan ||
    !jenjang ||
    !angkatan
  ) {
    return res.status(400).json({ msg: "Semua data mahasiswa harus diisi" });
  }
  try {
    // Validasi ukuran dan ekstensi file
    const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf"];
    const maxFileSize = 5 * 1024 * 1024;
    const validateFiles = (files) => {
      for (const file of files) {
        const ext = path.extname(file.name).toLowerCase();
        const fileSize = file.size;
        if (!allowedTypes.includes(ext) || fileSize > maxFileSize) {
          return false;
        }
      }
      return true;
    };

    if (!validateFiles([ktp, kartu_keluarga, surat_ket_aktif_kuliah])) {
      return res.status(422).json({
        msg: "Salah satu atau lebih file tidak valid. Pastikan file berupa gambar (png, jpg, jpeg) atau PDF dan ukuran tidak melebihi 5 MB.",
      });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file, type) => {
      const ext = path.extname(file.name);
      const fileName = `${type}_${nama}_${Date.now()}${ext}`;
      const folderPath = path.resolve(__dirname, `../public/uploads/${type}`);
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `https://asrama-sulteng-p58j.vercel.app/uploads/${type}/${fileName}`;
      return { fileName, url };
    };

    const savedFiles = await Promise.all([
      saveFileAndGetURL(ktp, "ktp"),
      saveFileAndGetURL(kartu_keluarga, "kartu_keluarga"),
      saveFileAndGetURL(surat_ket_aktif_kuliah, "surat_ket_aktif_kuliah"),
    ]);
    let user_id;
    let user_status;
    if (req.role === "user") {
      (user_id = req.userId), (user_status = "Menunggu");
    } else {
      user_id = "";
      user_status = "Diterima";
    }

    const mahasiswa = new Mahasiswa({
      nama,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      email,
      no_hp,
      alamat_asal,
      universitas,
      jurusan,
      jenjang,
      angkatan,
      ktp: savedFiles[0].url,
      kartu_keluarga: savedFiles[1].url,
      surat_ket_aktif_kuliah: savedFiles[2].url,
      userId: req.userId,
      id: user_id,
      status: user_status,
      alasan: null,
    });

    const savedMahasiswa = await mahasiswa.save();
    res.status(201).json({
      msg: "Data mahasiswa dan dokumen tersimpan dengan sukses",
      mahasiswa: savedMahasiswa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam menyimpan data mahasiswa dan dokumen",
      error: error.message,
    });
  }
};

export const updateMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!mahasiswa) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const {
      nama,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      email,
      no_hp,
      alamat_asal,
      universitas,
      jurusan,
      jenjang,
      angkatan,
      status,
      alasan,
    } = req.body;

    if (
      !nama ||
      !jenis_kelamin ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !email ||
      !no_hp ||
      !alamat_asal ||
      !universitas ||
      !jurusan ||
      !jenjang ||
      !angkatan
    ) {
      return res.status(400).json({ msg: "Semua data mahasiswa harus diisi" });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file, type) => {
      const ext = path.extname(file.name);
      const fileName = `${type}_${nama}_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/${type}`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${type}/${fileName}`;
      return { fileName, url };
    };

    const updateData = {
      nama,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      email,
      no_hp,
      alamat_asal,
      universitas,
      jurusan,
      jenjang,
      angkatan,
      status,
      alasan,
    };

    // Update file ktp jika diunggah
    if (req.files && req.files.ktp) {
      const { fileName, url } = await saveFileAndGetURL(req.files.ktp, "ktp");
      updateData.ktp = url;

      // Hapus file ktp lama
      if (mahasiswa.ktp) {
        const oldKtpPath = path.join(
          "./public/uploads/ktp",
          mahasiswa.ktp.split("/").pop()
        );
        if (fs.existsSync(oldKtpPath)) {
          fs.unlinkSync(oldKtpPath);
        }
      }
    }

    // Update file kartu keluarga jika diunggah
    if (req.files && req.files.kartu_keluarga) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.kartu_keluarga,
        "kartu_keluarga"
      );
      updateData.kartu_keluarga = url;

      // Hapus file kartu keluarga lama
      if (mahasiswa.kartu_keluarga) {
        const oldKartuKeluargaPath = path.join(
          "./public/uploads/kartu_keluarga",
          mahasiswa.kartu_keluarga.split("/").pop()
        );
        if (fs.existsSync(oldKartuKeluargaPath)) {
          fs.unlinkSync(oldKartuKeluargaPath);
        }
      }
    }

    // Update file surat ket aktif kuliah jika diunggah
    if (req.files && req.files.surat_ket_aktif_kuliah) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.surat_ket_aktif_kuliah,
        "surat_ket_aktif_kuliah"
      );
      updateData.surat_ket_aktif_kuliah = url;

      // Hapus file surat ket aktif kuliah lama
      if (mahasiswa.surat_ket_aktif_kuliah) {
        const oldSuratKetAktifKuliahPath = path.join(
          "./public/uploads/surat_ket_aktif_kuliah",
          mahasiswa.surat_ket_aktif_kuliah.split("/").pop()
        );
        if (fs.existsSync(oldSuratKetAktifKuliahPath)) {
          fs.unlinkSync(oldSuratKetAktifKuliahPath);
        }
      }
    }

    await Mahasiswa.update(updateData, {
      where: {
        id: req.params.id,
      },
    });

    res
      .status(200)
      .json({ msg: "Data mahasiswa dan dokumen berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam memperbarui data mahasiswa dan dokumen",
    });
  }
};

export const deleteMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!mahasiswa)
      return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Hapus file ktp jika ada
    if (mahasiswa.ktp) {
      const ktpPath = path.join(
        "./public/uploads/ktp",
        mahasiswa.ktp.split("/").pop()
      );
      if (fs.existsSync(ktpPath)) {
        fs.unlinkSync(ktpPath);
      }
    }

    // Hapus file kartu keluarga jika ada
    if (mahasiswa.kartu_keluarga) {
      const kartuKeluargaPath = path.join(
        "./public/uploads/kartu_keluarga",
        mahasiswa.kartu_keluarga.split("/").pop()
      );
      if (fs.existsSync(kartuKeluargaPath)) {
        fs.unlinkSync(kartuKeluargaPath);
      }
    }

    // Hapus file surat ket aktif kuliah jika ada
    if (mahasiswa.surat_ket_aktif_kuliah) {
      const suratKetAktifKuliahPath = path.join(
        "./public/uploads/surat_ket_aktif_kuliah",
        mahasiswa.surat_ket_aktif_kuliah.split("/").pop()
      );
      if (fs.existsSync(suratKetAktifKuliahPath)) {
        fs.unlinkSync(suratKetAktifKuliahPath);
      }
    }

    // Hapus data mahasiswa
    await Mahasiswa.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Mahasiswa deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan dalam menghapus mahasiswa" });
  }
};
