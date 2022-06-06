<template>
  <FormCard :title="title" :custumWidth="'lg:w-4/12'">
    <div class="w-full">
      <form @submit.prevent="update">
        <div class="mb-4" v-for="(field, index) in fields" :key="index">
          <label :for="field.slug" class="rhr-label">{{field.label}}</label>
          <input
            :name="field.slug"
            :id="field.slug"
            :type="field.type"
            class="rhr-input"
            v-model="data[field.slug]"
            required
          />
          <!-- <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors[`data.${field.slug}`]"
            >{{errors[`data.${field.slug}`][0]}}</span>
          </transition>-->
        </div>
        <div class="flex justify-end">
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
      data: {},
    };
  },
  mounted() {
    this.$root.$on("getFieldsModal", (title, fields, objek) => {
      this.title = "Edit " + title;
      this.fields = fields;
      fields.map((item, index) => {
        this.data[item.slug] = objek[item.slug];
      });
    });
  },
  methods: {
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
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        this.$refs.cancelButton.click();
        this.$root.$emit("fetchWp");
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>

<style>
</style>