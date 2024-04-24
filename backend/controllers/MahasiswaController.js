import Mahasiswa from "../models/MahasiswaModel.js";
import path from "path";
import Users from "../models/UserModel.js";
import fs from "fs";

export const getMahasiswa = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Mahasiswa.findAll({
        include: [
          {
            model: Users,
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
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMahasiswaById = async (req, res) => {};

export const createMahasiswa = async (req, res) => {
  // if (req.files === null)
  //   return res.status(400).json({ msg: "Tidak ada file yang diunggah" });

  // try {
  //   const {
  //     nama,
  //     jenis_kelamin,
  //     tempat_lahir,
  //     tanggal_lahir,
  //     email,
  //     no_hp,
  //     alamat_asal,
  //     universitas,
  //     jurusan,
  //     angkatan,
  //   } = req.body;
  //   const { ktp, kartu_keluarga, surat_ket_aktif_kuliah } = req.files;

  //   // Validasi ukuran dan ekstensi file
  //   const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf"]; // tambahkan ekstensi yang diperbolehkan jika diperlukan
  //   const maxFileSize = 5 * 1024 * 1024; // 5 MB dalam byte
  //   const validateFiles = (files) => {
  //     for (const file of files) {
  //       const ext = path.extname(file.name).toLowerCase();
  //       const fileSize = file.size;
  //       if (!allowedTypes.includes(ext) || fileSize > maxFileSize) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   };

  //   if (!validateFiles([ktp, kartu_keluarga, surat_ket_aktif_kuliah])) {
  //     return res.status(422).json({
  //       msg: "Salah satu atau lebih file tidak valid. Pastikan file berupa gambar (png, jpg, jpeg) atau PDF dan ukuran tidak melebihi 5 MB.",
  //     });
  //   }

  //   // Simpan file ke direktori yang sesuai dan buat URL
  //   const saveFileAndGetURL = async (file, type) => {
  //     const ext = path.extname(file.name);
  //     const fileName = `${type}_${Date.now()}${ext}`; // Menggunakan timestamp untuk mencegah duplikasi nama file
  //     const filePath = `./public/uploads/${fileName}`;
  //     await file.mv(filePath);
  //     const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
  //     return { fileName, url };
  //   };

  //   const savedFiles = await Promise.all([
  //     saveFileAndGetURL(ktp, "ktp"),
  //     saveFileAndGetURL(kartu_keluarga, "kartu_keluarga"),
  //     saveFileAndGetURL(surat_ket_aktif_kuliah, "surat_ket_aktif_kuliah"),
  //   ]);

  //   const mahasiswa = new Mahasiswa({
  //     nama,
  //     jenis_kelamin,
  //     tempat_lahir,
  //     tanggal_lahir,
  //     email,
  //     no_hp,
  //     alamat_asal,
  //     universitas,
  //     jurusan,
  //     angkatan,
  //     ktp: savedFiles[0].url,
  //     kartu_keluarga: savedFiles[1].url,
  //     surat_ket_aktif_kuliah: savedFiles[2].url,
  //     userId: req.userId,
  //   });

  //   await mahasiswa.save();
  //   res
  //     .status(201)
  //     .json({ msg: "Data mahasiswa dan dokumen tersimpan dengan sukses" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     msg: "Terjadi kesalahan dalam menyimpan data mahasiswa dan dokumen",
  //   });
  // }
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

    const savedFiles = await Promise.all([
      saveFileAndGetURL(ktp, "ktp"),
      saveFileAndGetURL(kartu_keluarga, "kartu_keluarga"),
      saveFileAndGetURL(surat_ket_aktif_kuliah, "surat_ket_aktif_kuliah"),
    ]);

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
      angkatan,
      ktp: savedFiles[0].url,
      kartu_keluarga: savedFiles[1].url,
      surat_ket_aktif_kuliah: savedFiles[2].url,
      userId: req.userId,
    });

    await mahasiswa.save();
    res
      .status(201)
      .json({ msg: "Data mahasiswa dan dokumen tersimpan dengan sukses" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam menyimpan data mahasiswa dan dokumen",
    });
  }
};

export const updateMahasiswa = async (req, res) => {};

export const deleteMahasiswa = async (req, res) => {};
