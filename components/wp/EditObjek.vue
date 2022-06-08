<template>
  <FormCard :title="'Objek Penilaian'" :custumWidth="'lg:w-4/12'">
    <div class="w-full">
      <form @submit.prevent="update">
        <div class="mb-4" v-for="(field, index) in fields" :key="index">
          <label
            :for="field.slug"
            class="rhr-label"
            :class="title == 'Elevasi' && data.kedudukan_tapak == 'Sama Rata' ? 'hidden' : ''"
          >{{field.label}}</label>

          <!-- Number & Text -->
          <div v-if="field.type == 'number' || field.type == 'text'" class="relative">
            <div
              v-if="field.unit && data.kedudukan_tapak != 'Sama Rata'"
              class="absolute inset-y-0 flex items-center justify-center text-sm right-4"
            >
              <span v-if="field.unit == 'm2'">
                <Mpersegi />
              </span>
              <span v-else>{{field.unit}}</span>
            </div>
            <input
              :name="field.slug"
              :id="field.slug"
              :type="field.type"
              step="any"
              class="rhr-input"
              :class="title == 'Elevasi' && data.kedudukan_tapak == 'Sama Rata' ? 'hidden' : ''"
              v-model="data[field.slug]"
              required
            />
          </div>

          <!-- options -->
          <div v-if="field.type == 'options'">
            <!-- Hak Atas Properti -->
            <template v-if="title == 'Hak Atas Properti'">
              <select
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data.hak_atas_properti_id"
              >
                <template v-for="(item, idx) in options.hak_atas_properti">
                  <option :value="item.id" :key="idx">{{item.singkatan}}</option>
                </template>
              </select>
            </template>

            <!-- Peruntukan -->
            <template v-else-if="title == 'Peruntukan'">
              <select
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data.peruntukan_id"
              >
                <template v-for="(item, idx) in options.peruntukan">
                  <option :value="item.id" :key="idx">{{item.text}}</option>
                </template>
              </select>
            </template>

            <!-- Default  -->
            <template v-else>
              <select
                @change="changeOptions($event, field.slug)"
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data[field.slug]"
              >
                <template v-for="(item, idx) in options[field.slug]">
                  <option :value="item" :key="idx">{{item}}</option>
                </template>
              </select>
            </template>
          </div>

          <!-- <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors[`data.${field.slug}`]"
            >{{errors[`data.${field.slug}`][0]}}</span>
          </transition>-->
        </div>
        <div class="flex justify-end mt-6">
          <div class="flex gap-2">
            <button
              type="button"
              ref="cancelButton"
              @click="closeFormCard"
              class="btn-primary-outline"
            >Batal</button>
            <button type="submit" class="btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </FormCard>
</template>

<script>
export default {
  name: "EditObjek",
  data() {
    return {
      title: "",
      fields: [],
      data: {
        hak_atas_properti_id: null,
        kedudukan_tapak: null,
        kedudukan_tapak_m: 0,
      },
      options: {},
    };
  },
  mounted() {
    this.fetchOptions();
    this.$root.$on("getFieldsModal", (title, fields, objek) => {
      this.title = title;
      this.fields = fields;
      fields.map((item) => {
        this.data[item.slug] = objek[item.slug];
      });
    });
  },
  methods: {
    async fetchOptions() {
      try {
        let response = await this.$axios.$get("/wp/options/list", {
          withCredentials: true,
        });
        console.log(response);
        this.options = response;
      } catch (e) {
        console.log(e.response);
      }
    },
    changeOptions(e, slug) {
      if (slug == "kedudukan_tapak") {
        if (e.target.value == "Sama Rata") {
          this.data.kedudukan_tapak_m = 0;
          console.log(this.data.kedudukan_tapak_m);
        }
      }
    },
    closeFormCard() {
      this.$root.$emit("closeModal");
    },
    async update() {
      try {
        let response = await this.$axios.$post(
          "/objek/update",
          {
            fields: this.fields,
            objek: this.data,
            id: this.$route.params.id,
            title: this.title,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        this.$refs.cancelButton.click();
        this.$root.$emit("fetchWp");
        this.$awn.success(response.message);
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>

<style>
</style>