import Informasi from "../models/InformasiModel.js";
import path from "path";
import fs from "fs";

export const getInformasi = async (req, res) => {
  try {
    let response;
    response = await Informasi.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getInformasiById = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!informasi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(informasi);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createInformasi = async (req, res) => {
  try {
    if (req.files === null)
      return res.status(400).json({ msg: "Tidak ada file yang diunggah" });

    const { deskripsi_singkat, visi, misi, alamat, email, no_hp, biaya } =
      req.body;

    if (
      !deskripsi_singkat ||
      !visi ||
      !misi ||
      !alamat ||
      !email ||
      !no_hp ||
      !biaya
    ) {
      return res.status(400).json({ msg: "Semua data informasi harus diisi" });
    }

    // Validasi ukuran dan ekstensi file
    const allowedTypes = [".png", ".jpg", ".jpeg"];
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

    const { banner, foto_deskripsi, struktur_organisasi } = req.files;

    if (!validateFiles([banner, foto_deskripsi, struktur_organisasi])) {
      return res.status(422).json({
        msg: "Salah satu atau lebih file tidak valid. Pastikan file berupa gambar (png, jpg, jpeg) dan ukuran tidak melebihi 5 MB.",
      });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file, type) => {
      const ext = path.extname(file.name);
      const fileName = `${type}_${Date.now()}${ext}`;
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
      saveFileAndGetURL(banner, "banner"),
      saveFileAndGetURL(foto_deskripsi, "foto_deskripsi"),
      saveFileAndGetURL(struktur_organisasi, "struktur_organisasi"),
    ]);

    const informasi = new Informasi({
      deskripsi_singkat,
      visi,
      misi,
      alamat,
      email,
      no_hp,
      biaya,
      banner: savedFiles[0].url,
      foto_deskripsi: savedFiles[1].url,
      struktur_organisasi: savedFiles[2].url,
      userId: req.userId,
    });

    await informasi.save();
    res
      .status(201)
      .json({ msg: "Data informasi asrama tersimpan dengan sukses" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam menyimpan data informasi asrama",
    });
  }
};

export const updateInformasi = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!informasi) {
      return res.status(404).json({ msg: "Informasi tidak ditemukan" });
    }

    const { deskripsi_singkat, visi, misi, alamat, email, no_hp, biaya } =
      req.body;

    if (
      !deskripsi_singkat ||
      !visi ||
      !misi ||
      !alamat ||
      !email ||
      !no_hp ||
      !biaya
    ) {
      return res.status(400).json({ msg: "Semua data informasi harus diisi" });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file, type) => {
      const ext = path.extname(file.name);
      const fileName = `${type}_${Date.now()}${ext}`;
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
      deskripsi_singkat,
      visi,
      misi,
      alamat,
      email,
      no_hp,
      biaya,
    };

    // Update file banner jika diunggah
    if (req.files && req.files.banner) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.banner,
        "banner"
      );
      updateData.banner = url;

      // Hapus file banner lama
      if (informasi.banner) {
        const oldBannerPath = path.join(
          "./public/uploads/banner",
          informasi.banner.split("/").pop()
        );
        if (fs.existsSync(oldBannerPath)) {
          fs.unlinkSync(oldBannerPath);
        }
      }
    }

    // Update file foto deskripsi jika diunggah
    if (req.files && req.files.foto_deskripsi) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.foto_deskripsi,
        "foto_deskripsi"
      );
      updateData.foto_deskripsi = url;

      // Hapus file foto deskripsi lama
      if (informasi.foto_deskripsi) {
        const oldFotoDeskripsiPath = path.join(
          "./public/uploads/foto_deskripsi",
          informasi.foto_deskripsi.split("/").pop()
        );
        if (fs.existsSync(oldFotoDeskripsiPath)) {
          fs.unlinkSync(oldFotoDeskripsiPath);
        }
      }
    }

    // Update file struktur organisasi jika diunggah
    if (req.files && req.files.struktur_organisasi) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.struktur_organisasi,
        "struktur_organisasi"
      );
      updateData.struktur_organisasi = url;

      // Hapus file struktur organisasi lama
      if (informasi.struktur_organisasi) {
        const oldStrukturOrganisasiPath = path.join(
          "./public/uploads/struktur_organisasi",
          informasi.struktur_organisasi.split("/").pop()
        );
        if (fs.existsSync(oldStrukturOrganisasiPath)) {
          fs.unlinkSync(oldStrukturOrganisasiPath);
        }
      }
    }

    await Informasi.update(updateData, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Informasi berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam memperbarui informasi",
    });
  }
};

export const deleteInformasi = async (req, res) => {
  try {
    const informasi = await Informasi.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!informasi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Hapus file transaksi jika ada
    if (informasi.banner) {
      const transaksiPath = path.join(
        "./public/uploads/banner",
        informasi.banner.split("/").pop()
      );
      if (fs.existsSync(transaksiPath)) {
        fs.unlinkSync(transaksiPath);
      }
    }
    // Hapus file transaksi jika ada
    if (informasi.foto_deskripsi) {
      const transaksiPath = path.join(
        "./public/uploads/foto_deskripsi",
        informasi.foto_deskripsi.split("/").pop()
      );
      if (fs.existsSync(transaksiPath)) {
        fs.unlinkSync(transaksiPath);
      }
    }
    // Hapus file transaksi jika ada
    if (informasi.struktur_organisasi) {
      const transaksiPath = path.join(
        "./public/uploads/struktur_organisasi",
        informasi.struktur_organisasi.split("/").pop()
      );
      if (fs.existsSync(transaksiPath)) {
        fs.unlinkSync(transaksiPath);
      }
    }

    // Hapus data transaksi
    await Informasi.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Transaksi keuangan deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan dalam menghapus transaksi keuangan" });
  }
};
