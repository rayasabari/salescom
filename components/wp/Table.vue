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
            </tr>
            <tr>
              <td>Contact Person</td>
              <td>Budi / 08123 45678.</td>
            </tr>
            <tr>
              <td>Jenis Data</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Tanggal Transaksi / Penawaran</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Jenis Properti</td>
              <td>Rumah</td>
            </tr>
            <tr>
              <td>Foto</td>
              <td>Foto</td>
            </tr>
            <tr>
              <td>Luas Tanah</td>
              <td>
                100 m
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Luas Bangunan</td>
              <td>
                180 m
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td class="t-separator">Unit Perbandingan</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Harga Penawaran</td>
              <td></td>
            </tr>
            <tr>
              <td>Harga Penawaran Tertinggi</td>
              <td></td>
            </tr>
            <tr>
              <td>Diskon</td>
              <td></td>
            </tr>
            <tr>
              <td>Kemungkinan Transaksi</td>
              <td></td>
            </tr>
            <tr>
              <td>Indikasi Nilai Bangunan</td>
              <td></td>
            </tr>
            <tr>
              <td>
                Indikasi Nilai Bangunan per m
                <sup>2</sup>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Indikasi Harga Transaksi</td>
              <td></td>
            </tr>
            <tr>
              <td>
                Indikasi Harga Transaksi Tanah per m
                <sup>2</sup>
              </td>
              <td></td>
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