import Kamar from "../models/KamarModel.js";
import path from "path";
import fs from "fs";
import Mahasiswas from "../models/MahasiswaModel.js";

export const getKamar = async (req, res) => {
  try {
    let response;
    response = await Kamar.findAll({
      include: [
        {
          model: Mahasiswas,
          attributes: ["nama", "universitas"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKamarById = async (req, res) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!kamar) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(kamar);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKamar = async (req, res) => {
  try {
    if (req.files === null)
      return res.status(400).json({ msg: "Tidak ada file yang diunggah" });

    const { nomor_kamar, fasilitas, mahasiswaId } = req.body;
    const { gambar } = req.files;

    if (!nomor_kamar || !fasilitas)
      return res.status(400).json({ msg: "Semua data transaksi harus diisi" });

    // Validasi ukuran dan ekstensi file
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const maxFileSize = 5 * 1024 * 1024;

    const validateFile = (file) => {
      const ext = path.extname(file.name).toLowerCase();
      const fileSize = file.size;
      return allowedTypes.includes(ext) && fileSize <= maxFileSize;
    };

    if (!validateFile(gambar)) {
      return res.status(422).json({
        msg: "File Gambar tidak valid. Pastikan file berupa gambar (png, jpg, jpeg) dan ukuran tidak melebihi 5 MB.",
      });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file) => {
      const ext = path.extname(file.name);
      const fileName = `gambar_kamar_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/gambar_kamar`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/gambar_kamar/${fileName}`;
      return { fileName, url };
    };

    const { url } = await saveFileAndGetURL(gambar);

    const kamar = new Kamar({
      nomor_kamar,
      fasilitas,
      mahasiswaId: mahasiswaId || null,
      gambar: url,
    });

    await kamar.save();
    res.status(201).json({
      msg: "Data kamar tersimpan dengan sukses",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam menyimpan Data kamar",
    });
  }
};

export const updateKamar = async (req, res) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kamar) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { nomor_kamar, fasilitas, mahasiswaId } = req.body;
    if (!nomor_kamar || !fasilitas) {
      return res.status(400).json({ msg: "Semua data kamar harus diisi" });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file) => {
      const ext = path.extname(file.name);
      const fileName = `gambar_kamar_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/gambar_kamar`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/gambar_kamar/${fileName}`;
      return { fileName, url };
    };

    const updateData = {
      nomor_kamar,
      fasilitas,
      mahasiswaId: req.userId,
    };

    // Update file bukti transaksi jika diunggah
    if (req.files && req.files.gambar) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.gambar,
        "gambar_kamar"
      );
      updateData.gambar = url;

      // Hapus file bukti transaksi lama
      if (kamar.gambar) {
        const oldBuktiTransaksiPath = path.join(
          "./public/uploads/gambar_kamar",
          kamar.gambar.split("/").pop()
        );
        if (fs.existsSync(oldBuktiTransaksiPath)) {
          fs.unlinkSync(oldBuktiTransaksiPath);
        }
      }
    }

    await Kamar.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data kamar berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam memperbarui Data kamar",
    });
  }
};
export const updateKamarByAdmin = async (req, res) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kamar) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { nomor_kamar, fasilitas } = req.body;
    if (!nomor_kamar || !fasilitas) {
      return res.status(400).json({ msg: "Semua data kamar harus diisi" });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file) => {
      const ext = path.extname(file.name);
      const fileName = `gambar_kamar_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/gambar_kamar`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/gambar_kamar/${fileName}`;
      return { fileName, url };
    };

    const updateData = {
      nomor_kamar,
      fasilitas,
    };

    // Update file bukti transaksi jika diunggah
    if (req.files && req.files.gambar) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.gambar,
        "gambar_kamar"
      );
      updateData.gambar = url;

      // Hapus file bukti transaksi lama
      if (kamar.gambar) {
        const oldBuktiTransaksiPath = path.join(
          "./public/uploads/gambar_kamar",
          kamar.gambar.split("/").pop()
        );
        if (fs.existsSync(oldBuktiTransaksiPath)) {
          fs.unlinkSync(oldBuktiTransaksiPath);
        }
      }
    }

    await Kamar.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data kamar berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam memperbarui Data kamar",
    });
  }
};

export const deleteKamar = async (req, res) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kamar) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Hapus file transaksi jika ada
    if (kamar.gambar) {
      const transaksiPath = path.join(
        "./public/uploads/gambar_kamar",
        kamar.gambar.split("/").pop()
      );
      if (fs.existsSync(transaksiPath)) {
        fs.unlinkSync(transaksiPath);
      }
    }

    // Hapus data transaksi
    await Kamar.destroy({
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
