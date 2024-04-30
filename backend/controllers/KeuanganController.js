import Keuangan from "../models/KeuanganModel.js";
import path from "path";
import fs from "fs";

export const getKeuangan = async (req, res) => {
  try {
    let response;
    response = await Keuangan.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKeuanganById = async (req, res) => {
  try {
    const informasiTransaksi = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!informasiTransaksi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(informasiTransaksi);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKeuangan = async (req, res) => {
  try {
    if (req.files === null)
      return res.status(400).json({ msg: "Tidak ada file yang diunggah" });

    const { tanggal, keterangan, jenis, nominal } = req.body;
    const { bukti_transaksi } = req.files;

    if (!tanggal || !keterangan || !jenis || !nominal)
      return res.status(400).json({ msg: "Semua data transaksi harus diisi" });

    // Validasi ukuran dan ekstensi file
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const maxFileSize = 5 * 1024 * 1024;

    const validateFile = (file) => {
      const ext = path.extname(file.name).toLowerCase();
      const fileSize = file.size;
      return allowedTypes.includes(ext) && fileSize <= maxFileSize;
    };

    if (!validateFile(bukti_transaksi)) {
      return res.status(422).json({
        msg: "File bukti transaksi tidak valid. Pastikan file berupa gambar (png, jpg, jpeg) dan ukuran tidak melebihi 5 MB.",
      });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file) => {
      const ext = path.extname(file.name);
      const fileName = `bukti_transaksi_${tanggal}_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/bukti_transaksi`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/bukti_transaksi/${fileName}`;
      return { fileName, url };
    };

    const { url } = await saveFileAndGetURL(bukti_transaksi);

    const informasiTransaksi = new Keuangan({
      tanggal,
      keterangan,
      jenis,
      nominal,
      bukti_transaksi: url,
    });

    await informasiTransaksi.save();
    res.status(201).json({
      msg: "Informasi transaksi dan bukti transaksi tersimpan dengan sukses",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam menyimpan informasi transaksi dan bukti transaksi",
    });
  }
};

export const updateKeuangan = async (req, res) => {
  try {
    const informasiTransaksi = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!informasiTransaksi) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const { tanggal, keterangan, jenis, nominal } = req.body;
    if (!tanggal || !keterangan || !jenis || !nominal) {
      return res.status(400).json({ msg: "Semua data informasi harus diisi" });
    }

    // Simpan file ke direktori yang sesuai dan buat URL
    const saveFileAndGetURL = async (file) => {
      const ext = path.extname(file.name);
      const fileName = `bukti_transaksi_${tanggal}_${Date.now()}${ext}`;
      const folderPath = `./public/uploads/bukti_transaksi`;
      const filePath = path.join(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      await file.mv(filePath);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/bukti_transaksi/${fileName}`;
      return { fileName, url };
    };

    const updateData = {
      tanggal,
      keterangan,
      jenis,
      nominal,
    };

    // Update file bukti transaksi jika diunggah
    if (req.files && req.files.bukti_transaksi) {
      const { fileName, url } = await saveFileAndGetURL(
        req.files.bukti_transaksi,
        "bukti_transaksi"
      );
      updateData.bukti_transaksi = url;

      // Hapus file bukti transaksi lama
      if (informasiTransaksi.bukti_transaksi) {
        const oldBuktiTransaksiPath = path.join(
          "./public/uploads/bukti_transaksi",
          informasiTransaksi.bukti_transaksi.split("/").pop()
        );
        if (fs.existsSync(oldBuktiTransaksiPath)) {
          fs.unlinkSync(oldBuktiTransaksiPath);
        }
      }
    }

    await Keuangan.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Informasi transaksi berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan dalam memperbarui informasi transaksi",
    });
  }
};

export const deleteKeuangan = async (req, res) => {
  try {
    const informasiTransaksi = await Keuangan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!informasiTransaksi)
      return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Hapus file transaksi jika ada
    if (informasiTransaksi.bukti_transaksi) {
      const transaksiPath = path.join(
        "./public/uploads/bukti_transaksi",
        informasiTransaksi.bukti_transaksi.split("/").pop()
      );
      if (fs.existsSync(transaksiPath)) {
        fs.unlinkSync(transaksiPath);
      }
    }

    // Hapus data transaksi
    await Keuangan.destroy({
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
