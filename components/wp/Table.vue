<template>
  <section class="pt-2 shadow-sm">
    <div class="w-full h-[99vh] overflow-auto bg-white">
      <div class="min-w-full bg-white" id="wptable">
        <table class="text-xs">
          <thead>
            <tr>
              <th class="t-separator">Deskripsi</th>
              <th>Objek</th>
              <template v-for="(pbd, idx) in pembandingSelected">
                <th :key="idx" colspan="3" class="!text-center">
                  <div class="flex items-center justify-center gap-2">
                    <span>Pembanding {{idx+1}}</span>
                    <button
                      @click="removePembanding(pbd.id)"
                      v-tooltip="'Remove Pembanding '+(idx+1)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-rose-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
              </template>
            </tr>
          </thead>
          <tbody class="text-gray-500">
            <tr>
              <td>Alamat Properti</td>
              <td>{{objek.alamat}}</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'alamat'" colspan="3">{{pbd.alamat}}</td>
              </template>
            </tr>
            <tr>
              <td>Koordinat</td>
              <td>{{`${objek.latitude}, ${objek.longitude}`}}</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'koordinat'" colspan="3">{{ `${pbd.latitude}, ${pbd.longitude}` }}</td>
              </template>
            </tr>
            <tr>
              <td>Contact Person</td>
              <td>{{objek.nama_cp}}</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'nama_cp'" colspan="3">{{ `${pbd.nama_cp} - ${pbd.telepon_cp}`}}</td>
              </template>
            </tr>
            <tr>
              <td>Jenis Data</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'jenis_data'" colspan="3">{{ pbd.jenis_data }}</td>
              </template>
            </tr>
            <tr>
              <td>Tanggal Transaksi / Penawaran</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'tgl_data'" colspan="3">{{ pbd.tanggal_jenis_data }}</td>
              </template>
            </tr>
            <tr>
              <td>Jenis Properti</td>
              <td>{{objek.jenis_properti}}</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'jenis_properti'" colspan="3">{{ pbd.jenis_properti }}</td>
              </template>
            </tr>
            <tr>
              <td>Foto</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'foto'" colspan="3">
                  <div class="flex items-center justify-center py-2">
                    <img
                      class="h-[120px] rounded-lg w-[180px] object-cover"
                      :src="`https://system.rhr.co.id/storage/files/attachment/pembanding/properti/${pbd.pembanding_id}/original/${pbd.foto}`"
                      :alt="'Foto Pembanding '+ (index+1)"
                    />
                  </div>
                </td>
              </template>
            </tr>
            <tr>
              <td>Luas Tanah</td>
              <td>
                {{ numSeparator(objek.luas_tanah,1) }}
                <Mpersegi />
              </td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'luas_tanah'" colspan="3">
                  {{ numSeparator(pbd.luas_tanah,1) }}
                  <Mpersegi />
                </td>
              </template>
            </tr>
            <tr>
              <td>Luas Bangunan</td>
              <td>
                {{ numSeparator(objek.luas_banguan,1) }}
                <Mpersegi />
              </td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'luas_bangunan'" colspan="3">
                  {{ numSeparator(pbd.luas_bangunan,1) }}
                  <Mpersegi />
                </td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Unit Perbandingan</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td>Harga Penawaran</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'penawaran'" colspan="3">{{ numSeparator(pbd.harga.penawaran,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>Harga Penawaran Tertinggi</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'penawaran_tertinggi'"
                  colspan="3"
                >{{ numSeparator(pbd.harga.penawaran_tertinggi,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>Diskon</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'diskon'" colspan="3">{{ numSeparator(pbd.diskon,1) }} %</td>
              </template>
            </tr>
            <tr>
              <td>Indikasi Nilai Properti</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_properti'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.properti,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>Indikasi Nilai Bangunan</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_bangunan'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.bangunan,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>
                Indikasi Nilai Bangunan/
                <Mpersegi />
              </td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_bangunan_m2'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.bangunan_m2,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>Indikasi Nilai Tanah</td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_tanah'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.tanah,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>
                Indikasi Nilai Tanah/
                <Mpersegi />
              </td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_tanah_m2'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.tanah_m2,0) }}</td>
              </template>
            </tr>
            <tr>
              <td>
                Indikasi Nilai Properti/
                <Mpersegi />Bangunan
              </td>
              <td></td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td
                  :key="index+'nilai_tanah_m2'"
                  colspan="3"
                >{{ numSeparator(pbd.indikasi_nilai.properti_per_m2_bangunan,0) }}</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penyesuaian Transaksi</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td class="t-separator">Elemen Perbandingan</td>
              <td class="t-separator">Deskripsi</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'sep-desc'" class="t-separator">Deskripsi</td>
                <td :key="index+'sep-persen'" class="t-separator">Persen</td>
                <td :key="index+'sep-adjust'" class="t-separator">Penyesuaian</td>
              </template>
            </tr>
            <tr>
              <td class="grid grid-rows-2 gap-1">
                <div class="font-medium text-left">Hak Atas Properti</div>
                <div class="italic font-light text-right">Adjustment Price</div>
              </td>
              <td>SHM</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'hap-desc'">{{pbd.hak_atas_properti}}</td>
                <td :key="index+'hap-persen'">0 %</td>
                <td :key="index+'hap-adjust'" class="grid grid-rows-2 gap-1">
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
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'sp-desc'">{{pbd.syarat_pembayaran}}</td>
                <td :key="index+'sp-persen'">0 %</td>
                <td :key="index+'sp-adjust'" class="grid grid-rows-2 gap-1">
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
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'kj-desc'">{{pbd.kondisi_penjualan}}</td>
                <td :key="index+'kj-persen'">0 %</td>
                <td :key="index+'kj-adjust'" class="grid grid-rows-2 gap-1">
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
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'psp-desc'">{{pbd.pengeluaran_setelah_pembelian}}</td>
                <td :key="index+'psp-persen'">0 %</td>
                <td :key="index+'psp-adjust'" class="grid grid-rows-2 gap-1">
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
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'kp-desc'">{{pbd.kondisi_pasar}}</td>
                <td :key="index+'kp-persen'">0 %</td>
                <td :key="index+'kp-adjust'" class="grid grid-rows-2 gap-1">
                  <div class="text-right border-b border-gray-300">300.000</div>
                  <div class="text-right">4.000.000</div>
                </td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penyesuaian Properti</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td class="t-separator">Lokasi</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
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
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'lj-desc'">{{numSeparator(pbd.lebar_jalan,1)}} m</td>
                <td :key="index+'lj-persen'">0 %</td>
                <td :key="index+'lj-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Jumlah Jalur</td>
              <td>1</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'jj-desc'">{{pbd.jumlah_jalur}}</td>
                <td :key="index+'jj-persen'">0 %</td>
                <td :key="index+'jj-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Jumlah Lajur</td>
              <td>2</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'jl-desc'">{{pbd.jumlah_lajur}}</td>
                <td :key="index+'jl-persen'">0 %</td>
                <td :key="index+'jl-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Perkerasan Jalan</td>
              <td>Aspal</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'pj-desc'">{{pbd.perkerasan_jalan}}</td>
                <td :key="index+'pj-persen'">0 %</td>
                <td :key="index+'pj-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Aksesibilitas</td>
              <td>Baik</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'aks-desc'">{{pbd.aksesibilitas}}</td>
                <td :key="index+'aks-persen'">0 %</td>
                <td :key="index+'aks-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Kondisi Lingkungan Sekitar</td>
              <td>Campuran</td>
              <template v-for="(pbd,index) in pembandingSelected">
                <td :key="index+'kls-desc'">{{pbd.kondisi_lingkungan_sekitar}}</td>
                <td :key="index+'kls-persen'">0 %</td>
                <td :key="index+'kls-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Karateristik Fisik</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td>Luas Tanah</td>
              <td>
                100
                <Mpersegi />
              </td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'lt-desc'">
                  {{ numSeparator(pbd.luas_tanah,1) }}
                  <Mpersegi />
                </td>
                <td :key="index+'lt-persen'">0 %</td>
                <td :key="index+'lt-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Lebar Muka</td>
              <td>19</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'lm-desc'">{{ numSeparator(pbd.lebar_muka,1) }} m</td>
                <td :key="index+'lm-persen'">0 %</td>
                <td :key="index+'lm-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bentuk Tapak</td>
              <td>Persegi Panjang</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'bt-desc'">{{ pbd.bentuk_tapak }}</td>
                <td :key="index+'bt-persen'">0 %</td>
                <td :key="index+'bt-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Elevasi</td>
              <td>+ 1</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'elv-desc'">{{ pbd.elevasi }} m</td>
                <td :key="index+'elv-persen'">0 %</td>
                <td :key="index+'elv-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Posisi</td>
              <td>Tengah</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'pst-desc'">{{ pbd.posisi_tapak }}</td>
                <td :key="index+'pst-persen'">0 %</td>
                <td :key="index+'pst-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Kondisi Tapak</td>
              <td>Darat</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'kdt-desc'">{{ pbd.kondisi_tapak }}</td>
                <td :key="index+'kdt-persen'">0 %</td>
                <td :key="index+'kdt-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Topografi</td>
              <td>Berbukit</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'tpg-desc'">{{ pbd.topografi }}</td>
                <td :key="index+'tpg-persen'">0 %</td>
                <td :key="index+'tpg-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Karakteristik Ekonomi</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Kualitas Pendatapan</td>
              <td>Baik</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'kpd-desc'">{{ pbd.kualitas_pendapatan }}</td>
                <td :key="index+'kpd-persen'">0 %</td>
                <td :key="index+'kpd-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Biaya Operasional</td>
              <td>Tidak Ada</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'bop-desc'">{{ pbd.biaya_operasional }}</td>
                <td :key="index+'bop-persen'">0 %</td>
                <td :key="index+'bop-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Ketentuan Sewa</td>
              <td>Tidak Ada</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'ksw-desc'">{{ pbd.ketentuan_sewa }}</td>
                <td :key="index+'ksw-persen'">0 %</td>
                <td :key="index+'ksw-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Manajemen</td>
              <td>Tidak Ada</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'bop-desc'">{{ pbd.biaya_operasional }}</td>
                <td :key="index+'bop-persen'">0 %</td>
                <td :key="index+'bop-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bauran Penyewa</td>
              <td>Baik</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'brn-desc'">{{ pbd.bauran_penyewa }}</td>
                <td :key="index+'brn-persen'">0 %</td>
                <td :key="index+'brn-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Penggunaan</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td>Peruntukan</td>
              <td>Zona Perumahan KDB Rendah</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'ptk-desc'">{{ pbd.peruntukan }}</td>
                <td :key="index+'ptk-persen'">0 %</td>
                <td :key="index+'ptk-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>KDB</td>
              <td>0</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'kdb-desc'">{{ pbd.kdb }}</td>
                <td :key="index+'kdb-persen'">0 %</td>
                <td :key="index+'kdb-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>KLB</td>
              <td>0</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'klb-desc'">{{ pbd.klb }}</td>
                <td :key="index+'klb-persen'">0 %</td>
                <td :key="index+'klb-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Ketinggian Maksimum</td>
              <td>0</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'ktm-desc'">{{ pbd.ketinggian_maksimum }}</td>
                <td :key="index+'ktm-persen'">0 %</td>
                <td :key="index+'ktm-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>GSB</td>
              <td>0</td>
              <template v-for="(pbd, index) in pembandingSelected">
                <td :key="index+'gsb-desc'">{{ pbd.gsb }}</td>
                <td :key="index+'gsb-persen'">0 %</td>
                <td :key="index+'gsb-value'" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Lainnya</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in pembandingSelected.length">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in pembandingSelected.length">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <template v-for="n in pembandingSelected.length">
                <td :key="n">...</td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Kesimpulan</td>
              <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
            </tr>
            <tr>
              <td>Net Adjustment</td>
              <td></td>
              <template v-for="n in pembandingSelected.length">
                <td :key="n"></td>
                <td :key="n">0 %</td>
                <td :key="n" class="text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Harga Setelah Adjustment</td>
              <td></td>
              <template v-for="n in pembandingSelected.length">
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
              <td class="font-semibold t-nilai">79,84 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n">25 %</td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bobot Absolute</td>
              <td class="font-semibold t-nilai">100,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n">25 %</td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Inverse</td>
              <td class="font-semibold t-nilai">200,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n">25 %</td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td>Bobot Inverse</td>
              <td class="font-semibold t-nilai">100,00 %</td>
              <template v-for="n in 3">
                <td :key="n"></td>
                <td :key="n">25 %</td>
                <td :key="n" class="font-semibold text-right">123.000</td>
              </template>
            </tr>
            <tr>
              <td class="t-separator">Kisaran Nilai</td>
              <td class="t-separator" :colspan=" 1 + (3*3)"></td>
            </tr>
            <tr>
              <td>Min</td>
              <td class="font-semibold t-nilai">1.000.000</td>
            </tr>
            <tr>
              <td>Max</td>
              <td class="font-semibold t-nilai">2.000.000</td>
            </tr>
            <tr>
              <td>Deviasi</td>
              <td class="font-semibold t-nilai">10 %</td>
            </tr>
            <tr>
              <td class="t-separator-dark">
                Nilai ... per
                <Mpersegi />
              </td>
              <td class="font-semibold t-nilai t-separator-dark">1.000.000</td>
            </tr>
            <tr>
              <td>Nilai ...</td>
              <td class="font-semibold t-nilai">1.000.000</td>
            </tr>
            <tr>
              <td>Dibulatkan</td>
              <td class="font-semibold t-nilai">1.000.000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import numFormat from "@/services/numFormat";
export default {
  name: "WpTable",
  props: ["objek", "pembandingSelected"],
  data() {
    return {};
  },
  methods: {
    removePembanding(id) {
      this.$root.$emit("removePembanding", id);
    },
    numSeparator(num, dec) {
      return numFormat.separator(num, dec);
    },
  },
};
</script>

<style>
</style>