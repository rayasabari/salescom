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
                <IconRemove></IconRemove>
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
          <td :key="index+item.id+'-desc'">{{pbd[item.key_pembanding]}}</td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-adjust'" class="grid grid-rows-2 gap-1">
            <div
              class="text-right border-b border-gray-300"
            >{{getAdjustment(pbd, item, 'adjustment')}}</div>
            <div class="text-right">{{getAdjustment(pbd, item, 'adjustment_transaksi')}}</div>
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
        <td>
          {{item.nama}}
          <span
            v-if="item.nama == 'Jarak Terhadap'"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type,item.unit)"
          >
            <span v-if="objek.nama_poi == null">POI</span>
            <span v-else class="font-semibold cursor-pointer wp-table-link">{{objek.nama_poi}}</span>
          </span>
        </td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type,item.unit)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              <span
                v-if="item.input_type == 'number' || item.input_type == 'map'"
              >{{ numSeparator(objek[item.key_objek],1) }}</span>
              <span v-else>{{objek[item.key_objek]}}</span>
              <template v-if="item.unit != null">
                <span>{{ item.unit }}</span>
              </template>
            </div>
            <div v-else class="font-medium text-rose-500">Belum diinput</div>
          </div>
        </td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+item.id+'-desc'">
            <template v-if="item.nama == 'Jarak Terhadap'">
              <span
                v-if="pbd[item.key_pembanding] != null"
              >{{ numSeparator(pbd[item.key_pembanding],1) }} m</span>
              <span
                v-else
                class="font-semibold cursor-pointer text-rose-400"
                @click="modalEditObjek(item.nama, item.key_objek, item.input_type,item.unit)"
              >Belum dihitung</span>
            </template>
            <template v-else>
              <span
                v-if="item.input_type == 'number'"
              >{{ numSeparator(pbd[item.key_pembanding],1) }}</span>
              <span v-else>{{pbd[item.key_pembanding]}}</span>
              <template v-if="item.unit == 'm2'">
                <Mpersegi />
              </template>
              <template v-else>
                <span>{{item.unit}}</span>
              </template>
            </template>
          </td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
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
          <td :key="index+item.id+'-desc'">
            <span v-if="item.input_type == 'number'">{{ numSeparator(pbd[item.key_objek],1) }}</span>
            <span v-else>{{pbd[item.key_objek]}}</span>
            <template v-if="item.unit == 'm2'">
              <Mpersegi />
            </template>
            <template v-else>
              <span>{{item.unit}}</span>
            </template>
          </td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
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
          <td :key="index+item.id+'-desc'">{{ pbd[item.key_pembanding] }}</td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
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
          <td :key="index+item.id+'-desc'">{{ pbd[item.key_pembanding] }}</td>
          <td :key="index+item.id+'persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Karakteristik Unit/Bangunan</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Karakteristik Unit/Bangunan  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Karakteristik Unit/Bangunan')"
        :key="idx+'karakteristikUnitBangunan'"
      >
        <td>{{item.nama}}</td>
        <td>
          <div
            class="flex items-center justify-center gap-2 cursor-pointer"
            @click="modalEditObjek(item.nama, item.key_objek, item.input_type, item.unit)"
          >
            <div class="wp-table-link" v-if="objek[item.key_objek] != null">
              <span
                v-if="item.input_type == 'number' && item.key_objek != 'tahun_selesai_dibangun'"
              >{{ numSeparator(objek[item.key_objek], item.key_objek == 'luas_bangunan' ? 1 : 0) }}</span>
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
          <td :key="index+item.id+'-desc'">{{ pbd[item.key_pembanding] }}</td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Lainnya</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Lainnya  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Lainnya')"
        :key="idx+'lainnya'"
      >
        <td>...</td>
        <td>...</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+item.id+'-desc'">...</td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Kesimpulan</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Kesimpulan  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Kesimpulan')"
        :key="idx+'kesimpulan'"
      >
        <td>{{item.nama}}</td>
        <td></td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+item.id+''"></td>
          <td :key="index+item.id+'-persen'">
            <div
              class="text-right"
              v-if="item.nama == 'Net Adjustment'"
            >{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'" class="text-right">
            <div class="font-semibold text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
        </template>
      </tr>

      <tr>
        <td class="t-separator">Rekonsiliasi</td>
        <td class="t-separator" :colspan=" 1 + (pembandingSelected.length*3)"></td>
      </tr>

      <!-- Rrekonsiliasi  -->
      <tr
        v-for="(item, idx) in elemenPerbandingan.filter(item => item.section == 'Rekonsiliasi')"
        :key="idx+'rekonsiliasi'"
      >
        <td>{{item.nama}}</td>
        <td class="font-semibold t-nilai">79,84 %</td>
        <template v-for="(pbd, index) in pembandingSelected">
          <td :key="index+item.id+'-desc'"></td>
          <td :key="index+item.id+'-persen'">
            <div class="text-right">{{ getAdjustment(pbd, item, 'persen') }} %</div>
          </td>
          <td :key="index+item.id+'-value'">
            <div class="font-semibold text-right">{{ getAdjustment(pbd, item, 'adjustment') }}</div>
          </td>
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
import { numFormat } from "@/services/numFormat";
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
      } else if (title == "Jarak Terhadap") {
        fields = [
          {
            label: "Nama POI",
            slug: "nama_poi",
            type: "text",
          },
          {
            label: "Latitude POI",
            slug: "latitude_poi",
            type: "text",
          },
          {
            label: "Longitude POI",
            slug: "longitude_poi",
            type: "text",
          },
          {
            label: "Jarak POI terhadap Objek",
            slug: "jarak_poi",
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
    getAdjustment(pbd, item, key) {
      const adjustment = pbd.adjustment.find((adj) => {
        adj.elemen_id == item.id[key];
      });
      if (key == "persen") {
        return this.numSeparator(adjustment, 1);
      }
      return this.numSeparator(adjustment, 0);
    },
    numSeparator(num, dec) {
      return numFormat(num, dec);
    },
  },
};
</script>

<style>
</style>