<template>
  <section class="mt-5 shadow-sm">
    <div class="w-full h-[83vh] overflow-auto bg-white">
      <div class="min-w-full bg-white">
        <table id="wptable" class="text-xs">
          <thead>
            <tr>
              <th class="t-separator">Deskripsi</th>
              <th>Objek</th>
              <template v-for="n in 3">
                <th :key="n" colspan="3" class="text-center">Pembanding {{n}}</th>
              </template>
            </tr>
          </thead>
          <tbody class="text-gray-500">
            <tr>
              <td>Alamat Properti</td>
              <td>Jl. Rumah Sakit H. No.10, Kenangan Baru, Kec. Percut Sei Tuan, Kabupaten Deli Serdang, Sumatera Utara 20371.</td>
              <td
                colspan="3"
              >Jl. Suluh, Sidorejo Hilir, Medan Tembung, Kota Medan, Sumatera Utara, Indonesia</td>
              <td
                colspan="3"
              >JL. K.L. Yos Sudarso, Km. 7,1, No. 1 C, Tanjung Mulia, Medan Deli, Medan City, North Sumatra 20241, Indonesia</td>
              <td
                colspan="3"
              >JL. K.L. Yos Sudarso, Km. 7,1, No. 1 C, Tanjung Mulia, Medan Deli, Medan City, North Sumatra 20241, Indonesia</td>
            </tr>
            <tr>
              <td>Koordinat</td>
              <td>3.61386, 98.71646</td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">3.61386, 98.71646</td>
              </template>
            </tr>
            <tr>
              <td>Contact Person</td>
              <td>Budi / 08123 45678</td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">Budi / 08123 45678</td>
              </template>
            </tr>
            <tr>
              <td>Jenis Data</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">Penawaran</td>
              </template>
            </tr>
            <tr>
              <td>Tanggal Transaksi / Penawaran</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">10 Januari 2022</td>
              </template>
            </tr>
            <tr>
              <td>Jenis Properti</td>
              <td>Rumah Tinggal</td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">Rumah Tinggal</td>
              </template>
            </tr>
            <tr>
              <td>Foto</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3"></td>
              </template>
            </tr>
            <tr>
              <td>Luas Tanah</td>
              <td>
                100 m
                <sup>2</sup>
              </td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">
                  100 m
                  <sup>2</sup>
                </td>
              </template>
            </tr>
            <tr>
              <td>Luas Bangunan</td>
              <td>
                180 m
                <sup>2</sup>
              </td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">
                  180 m
                  <sup>2</sup>
                </td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Unit Perbandingan</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Harga Penawaran</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">1.500.000.000</td>
              </template>
            </tr>
            <tr>
              <td>Harga Penawaran Tertinggi</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">0</td>
              </template>
            </tr>
            <tr>
              <td>Diskon</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">5 %</td>
              </template>
            </tr>
            <tr>
              <td>Kemungkinan Transaksi</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">1.425.000.000</td>
              </template>
            </tr>
            <tr>
              <td>Indikasi Nilai Bangunan</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">281.200.000</td>
              </template>
            </tr>
            <tr>
              <td>
                Indikasi Nilai Bangunan per m
                <sup>2</sup>
              </td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">3.515.000</td>
              </template>
            </tr>
            <tr>
              <td>Indikasi Harga Transaksi</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">1.143.800.000</td>
              </template>
            </tr>
            <tr>
              <td>
                Indikasi Harga Transaksi Tanah per m
                <sup>2</sup>
              </td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n" colspan="3">1.634.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penyesuaian Transaksi</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td class="t-separator">Elemen Perbandingan</td>
              <td class="t-separator">Deskripsi</td>
              <template v-for="n in 3">
                <td :key="n" class="t-separator">Deskripsi</td>
                <td :key="n" class="t-separator">Persen</td>
                <td :key="n" class="t-separator">Penyesuaian</td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Hak Atas Properti</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>SHM</td>
              <template v-for="n in 3">
                <td :key="n">SHM</td>
                <td :key="n">0 %</td>
                <td :key="n" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Syarat Pembiayaan</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>Tunai</td>
              <template v-for="n in 3">
                <td :key="n">Tunai</td>
                <td :key="n">0 %</td>
                <td :key="n" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Kondisi Penjualan</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>Normal</td>
              <template v-for="n in 3">
                <td :key="n">Normal</td>
                <td :key="n">0 %</td>
                <td :key="n" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Pengeluaran Setelah Pembelian</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>Tidak Ada</td>
              <template v-for="n in 3">
                <td :key="n">Tidak Ada</td>
                <td :key="n">0 %</td>
                <td :key="n" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Kondisi Pasar</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>Normal</td>
              <template v-for="n in 3">
                <td :key="n">Normal</td>
                <td :key="n">0 %</td>
                <td :key="n" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penyesuaian Properti</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td class="t-separator">Lokasi</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Jarak Terhadap</td>
              <td>7.668,0 m</td>
              <template v-for="n in 3">
                <td :key="n">6.331,0 m</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Kelas Jalan</td>
              <td>Jalan Arteri</td>
              <template v-for="n in 3">
                <td :key="n">Jalan Kolektor</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Lebar Jalan</td>
              <td>10 m</td>
              <template v-for="n in 3">
                <td :key="n">10 m</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Jumlah Jalur</td>
              <td>1</td>
              <template v-for="n in 3">
                <td :key="n">1</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Jumlah Lajur</td>
              <td>2</td>
              <template v-for="n in 3">
                <td :key="n">2</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Perkerasan Jalan</td>
              <td>Aspal</td>
              <template v-for="n in 3">
                <td :key="n">Aspal</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Aksesibilitas</td>
              <td>Baik</td>
              <template v-for="n in 3">
                <td :key="n">Baik</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Kondisi Lingkungan Sekitar</td>
              <td>Campuran</td>
              <template v-for="n in 3">
                <td :key="n">Campuran</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Karateristik Fisik</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Luas Tanah</td>
              <td>
                100 m
                <sup>2</sup>
              </td>
              <template v-for="n in 3">
                <td :key="n">
                  100 m
                  <sup>2</sup>
                </td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Lebar Muka</td>
              <td>19</td>
              <template v-for="n in 3">
                <td :key="n">19</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bentuk Tapak</td>
              <td>Persegi Panjang</td>
              <template v-for="n in 3">
                <td :key="n">Persegi Panjang</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Elevasi</td>
              <td>+ 1</td>
              <template v-for="n in 3">
                <td :key="n">+ 1</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Posisi</td>
              <td>Tengah</td>
              <template v-for="n in 3">
                <td :key="n">Tengah</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Kondisi Tapak</td>
              <td>Darat</td>
              <template v-for="n in 3">
                <td :key="n">Darat</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Topografi</td>
              <td>Berbukit</td>
              <template v-for="n in 3">
                <td :key="n">Berbukit</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Karakteristik Ekonomi</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Kualitas Pendatapan</td>
              <td>Baik</td>
              <template v-for="n in 3">
                <td :key="n">Baik</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Biaya Operasional</td>
              <td>Tidak Ada</td>
              <template v-for="n in 3">
                <td :key="n">Tidak Ada</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Ketentuan Sewa</td>
              <td>Tidak Ada</td>
              <template v-for="n in 3">
                <td :key="n">Tidak Ada</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Manajemen</td>
              <td>Tidak Ada</td>
              <template v-for="n in 3">
                <td :key="n">Tidak Ada</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bauran Penyewa</td>
              <td>Baik</td>
              <template v-for="n in 3">
                <td :key="n">Baik</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penggunaan</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Peruntukan</td>
              <td>Zona Perumahan KDB Rendah</td>
              <template v-for="n in 3">
                <td :key="n">Zona Perumahan KDB Rendah</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>KDB</td>
              <td>0</td>
              <template v-for="n in 3">
                <td :key="n">0</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>KLB</td>
              <td>0</td>
              <template v-for="n in 3">
                <td :key="n">0</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Ketinggian Bangunan</td>
              <td>0</td>
              <template v-for="n in 3">
                <td :key="n">0</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>GSB</td>
              <td>0</td>
              <template v-for="n in 3">
                <td :key="n">0</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Lainnya</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in 3">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in 3">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in 3">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Kesimpulan</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Net Adjustment</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Harga Setelah Adjustment</td>
              <td></td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n"></td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Rekonsiliasi</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Gross Adjustment</td>
              <td>79,84 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n"></td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bobot Absolute</td>
              <td>100,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n"></td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Inverse</td>
              <td>200,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n"></td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bobot Inverse</td>
              <td>100,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n"></td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Kisaran Nilai</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Min</td>
              <td class="text-right">1.000.000</td>
            </tr>
            <tr>
              <td>Max</td>
              <td class="text-right">2.000.000</td>
            </tr>
            <tr>
              <td>Deviasi</td>
              <td class="text-right">10 %</td>
            </tr>
            <tr>
              <td class="t-nilai-permeter">
                Nilai ... per m
                <sup>2</sup>
              </td>
              <td class="text-right t-nilai-permeter">1.000.000</td>
            </tr>
            <tr>
              <td>Nilai ...</td>
              <td class="text-red-500">1.000.000</td>
            </tr>
            <tr>
              <td>Dibulatkan</td>
              <td class="text-right">1.000.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>