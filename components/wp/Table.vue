<template>
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
                @click="removePembanding(pbd.id, idx+1)"
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
        <td>{{ objek.alamat }}</td>
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
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek('Contact Person', '', 'text')"
          >
            <div
              class="wp-table-link"
              v-if="objek.nama_cp != null"
            >{{ objek.nama_cp + ' - (' + objek.telepon_cp +')' }}</div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
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
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek('Foto', 'foto', 'file')"
          >
            <div v-if="objek.foto" class="flex items-center justify-center py-2">
              <div
                class="min-h-[120px] w-[180px] bg-slate-300 rounded-lg overflow-hidden"
                :class="!imgObjekLoaded ? 'animate-pulse':''"
              >
                <transition name="fade">
                  <img
                    class="h-[120px] w-[180px] object-cover"
                    :src="objek.foto.thumbnail"
                    :alt="'Foto Objek Penilaian'"
                    @load="imgObjekLoaded = true"
                    v-show="imgObjekLoaded"
                  />
                </transition>
              </div>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diupload</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'foto'" colspan="3">
            <div class="flex items-center justify-center py-2">
              <div
                class="min-h-[120px] w-[180px] bg-slate-300 rounded-lg overflow-hidden"
                :class="!imgLoaded[index] ? 'animate-pulse':''"
              >
                <transition name="fade">
                  <img
                    class="h-[120px] w-[180px] object-cover"
                    :src="`https://system.rhr.co.id/storage/files/attachment/pembanding/properti/${pbd.pembanding_id}/original/${pbd.foto}`"
                    :alt="'Foto Pembanding '+ (index+1)"
                    @load="onImgLoaded(index)"
                    v-show="imgLoaded[index]"
                  />
                </transition>
              </div>
            </div>
          </td>
        </template>
      </tr>
      <tr>
        <td>Luas Tanah</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek('Luas Tanah', 'luas_tanah','number','m2')"
          >
            <div class="wp-table-link" v-if="objek.luas_tanah != null">
              {{ numSeparator(objek.luas_tanah,1) }}
              <Mpersegi />
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
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
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek('Luas Bangunan', 'luas_bangunan','number', 'm2')"
          >
            <div class="wp-table-link" v-if="objek.luas_bangunan != null">
              {{ numSeparator(objek.luas_bangunan,1) }}
              <Mpersegi />
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
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
          <td :key="index+'nilai_tanah'" colspan="3">{{ numSeparator(pbd.indikasi_nilai.tanah,0) }}</td>
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

      <!-- Kondisi Transaksi  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Kondisi Transaksi')"
        :key="idx+'kondisiTransaksi'"
      >
        <td class="grid grid-rows-2 gap-1">
          <div class="font-medium text-left">{{item.nama}}</div>
          <div class="italic font-light text-right">Adjustment Price</div>
        </td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              <span
                v-if="item.key_objek == 'hak_atas_properti_id'"
              >{{ objek.hak_atas_properti.singkatan }}</span>
              <span v-else>{{ objek[item.key_objek] }}</span>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd,index) in pembandingSelected">
          <td :key="index+'hap-desc'">{{pbd[item.key_pembanding]}}</td>
          <td :key="index+'hap-persen'">0 %</td>
          <td :key="index+'hap-adjust'" class="grid grid-rows-2 gap-1">
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

      <!-- Lokasi  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Lokasi')"
        :key="idx+'lokasi'"
      >
        <td>{{item.nama}}</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type,item.unit)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              {{ objek[item.key_objek] }}
              <template v-if="item.unit != null">
                <span>{{ item.unit }}</span>
              </template>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'jrk-desc'">{{pbd[item.key_pembanding]}}</td>
          <td :key="index+'jrk-persen'">0 %</td>
          <td :key="index+'jrk-value'" class="text-right">123.000</td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Karateristik Fisik</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Karakteristik Fisik  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Karakteristik Fisik')"
        :key="idx+'karakteristikFisik'"
      >
        <td>{{item.nama}}</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type, item.unit)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              <span v-if="item.input_type == 'number'">{{ numSeparator(objek[item.key_objek],1) }}</span>
              <span v-else>{{objek[item.key_objek]}}</span>
              <template v-if="item.unit == 'm2'">
                <Mpersegi />
              </template>
              <template v-else>
                <span>{{item.unit}}</span>
              </template>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'lt-desc'">
            <span v-if="item.input_type == 'number'">{{ numSeparator(pbd[item.key_objek],1) }}</span>
            <span v-else>{{pbd[item.key_objek]}}</span>
            <template v-if="item.unit == 'm2'">
              <Mpersegi />
            </template>
            <template v-else>
              <span>{{item.unit}}</span>
            </template>
          </td>
          <td :key="index+'lt-persen'">0 %</td>
          <td :key="index+'lt-value'" class="text-right">123.000</td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Karakteristik Ekonomi</td>
        <td class="t-separator" :colspan=" 1 + (3*3)"></td>
      </tr>

      <!-- Karakteristik Ekonomi  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Karakteristik Ekonomi')"
        :key="idx+'karakteristikEkonomi'"
      >
        <td>{{item.nama}}</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type)"
          >
            <div
              class="wp-table-link"
              v-if="objek[item.key_objek] != null"
            >{{ objek[item.key_objek] }}</div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'kpd-desc'">{{ pbd[item.key_pembanding] }}</td>
          <td :key="index+'kpd-persen'">0 %</td>
          <td :key="index+'kpd-value'" class="text-right">123.000</td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Penggunaan</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Penggunann  -->
      <tr
        v-for="(item,idx) in elemenPerbandingan.filter(item => item.section == 'Penggunaan')"
        :key="idx+'penggunaan'"
      >
        <td>{{item.nama}}</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek,item.input_type)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              <span v-if="item.key_objek == 'peruntukan_id'">{{ objek.peruntukan.text }}</span>
              <span v-else>{{ objek[item.key_objek] }}</span>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'ptk-desc'">{{ pbd[item.key_pembanding] }}</td>
          <td :key="index+'ptk-persen'">0 %</td>
          <td :key="index+'ptk-value'" class="text-right">123.000</td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Lainnya</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <template v-for="(pbd, index) in pembandingSelected.length">
          <td :key="index+'lny1-desc'">...</td>
          <td :key="index+'lny1-persen'">0 %</td>
          <td :key="index+'lny1-value'" class="text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <template v-for="(pbd, index) in pembandingSelected.length">
          <td :key="index+'lny2-desc'">...</td>
          <td :key="index+'lny2-persen'">0 %</td>
          <td :key="index+'lny2-value'" class="text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <template v-for="(pbd, index) in pembandingSelected.length">
          <td :key="index+'lny3-desc'">...</td>
          <td :key="index+'lny3-persen'">0 %</td>
          <td :key="index+'lny3-value'" class="text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td class="t-separator">Kesimpulan</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>
      <tr>
        <td>Net Adjustment</td>
        <td></td>
        <template v-for="(pbd, index) in pembandingSelected.length">
          <td :key="index+'netadj'"></td>
          <td :key="index+'netadj-persen'">0 %</td>
          <td :key="index+'netadj-value'" class="text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>Harga Setelah Adjustment</td>
        <td></td>
        <template v-for="(pbd, index) in pembandingSelected.length">
          <td :key="index+'hsa-desc'"></td>
          <td :key="index+'hsa-persen'"></td>
          <td :key="index+'hsa-value'" class="font-semibold text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td class="t-separator">Rekonsiliasi</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>
      <tr>
        <td>Gross Adjustment</td>
        <td class="font-semibold t-nilai">79,84 %</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'grs-desc'"></td>
          <td :key="index+'grs-persen'">25 %</td>
          <td :key="index+'grs-value'" class="font-semibold text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>Bobot Absolute</td>
        <td class="font-semibold t-nilai">100,00 %</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'bbt-desc'"></td>
          <td :key="index+'bbt-persen'">25 %</td>
          <td :key="index+'bbt-value'" class="font-semibold text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>Inverse</td>
        <td class="font-semibold t-nilai">200,00 %</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'inv-desc'"></td>
          <td :key="index+'inv-persen'">25 %</td>
          <td :key="index+'inv-value'" class="font-semibold text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td>Bobot Inverse</td>
        <td class="font-semibold t-nilai">100,00 %</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+'bbi-desc'"></td>
          <td :key="index+'bbi-persen'">25 %</td>
          <td :key="index+'bbi-value'" class="font-semibold text-right">123.000</td>
        </template>
      </tr>
      <tr>
        <td class="t-separator">Kisaran Nilai</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
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
</template>

<script>
import numFormat from "@/services/numFormat";
export default {
  name: "WpTable",
  props: ["objek", "elemenPerbandingan", "pembandingSelected"],
  data() {
    return {
      imgLoaded: [],
      imgObjekLoaded: false,
    };
  },
  methods: {
    onImgLoaded(index) {
      const imgstate = {
        idx: index,
        loaded: true,
      };
      this.imgLoaded.push(imgstate);
    },
    modalEditObjek(title, slug, type, unit = false) {
      let fields = [];
      if (title == "Contact Person") {
        fields = [
          {
            label: "Nama CP",
            slug: "nama_cp",
            type: "text",
          },
          {
            label: "Telepon CP",
            slug: "telepon_cp",
            type: "text",
          },
        ];
      } else if (title == "Elevasi") {
        fields = [
          {
            label: "Kedudukan Tapak",
            slug: "kedudukan_tapak",
            type: "options",
          },
          {
            label: "Tinggi/Rendah",
            slug: "kedudukan_tapak_m",
            type: "number",
            unit: "m",
          },
        ];
      } else {
        fields = [
          {
            label: title,
            slug: slug,
            type: type,
            unit: unit,
          },
        ];
      }
      this.$root.$emit("getFieldsModal", title, fields, this.objek);
      this.$parent.toggleShow("EditObjek");
    },
    removePembanding(id, index) {
      this.$root.$emit("removePembanding", id, index);
    },
    numSeparator(num, dec) {
      return numFormat.separator(num, dec);
    },
  },
};
</script>

<style>
</style>