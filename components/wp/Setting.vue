<template>
  <FormCard title="WP Setting" customWidth="lg:w-4/12">
    <div class="w-full">
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="unitPerbandingan" class="rhr-label">Unit Perbandingan</label>
          <select
            class="rhr-input"
            name="unitPerbandingan"
            id="unitPerbandingan"
            v-model="setting.unit_perbandingan_id"
          >
            <template v-for="unit in options.unit_perbandingan">
              <option :key="unit.id" :value="unit.id">{{unit.name}}</option>
            </template>
          </select>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button @click="closeFormCard" type="button" class="btn-primary-outline">Batal</button>
          <button type="submit" class="btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </FormCard>
</template>

<script>
export default {
  name: "WpSetting",
  props: ["objek", "options", "setting"],
  methods: {
    closeFormCard() {
      this.$root.$emit("closeModal");
    },
    async onSubmit() {
      try {
        let response = await this.$axios.$post(
          `wp/setting/update`,
          {
            id: this.objek.id,
            unit_perbandingan_id: this.setting.unit_perbandingan_id,
          },
          {
            withCredentials: true,
          }
        );
        this.$awn.success(response.message);
        this.closeFormCard()
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>