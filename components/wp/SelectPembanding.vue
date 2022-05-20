<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col gap-4">
      <div class="text-center">
        Pembanding Belum dipilih, silahkan pilih
        <strong
          class="font-medium text-rose-500"
        >minimal 3 pembanding!</strong>
      </div>
      <div class="flex justify-center gap-3">
        <NuxtLink to="/dashboard" class="btn-primary-outline btn-sm">Kembali</NuxtLink>
        <button @click="$parent.toggleShow('Map')" class="flex items-center gap-2 btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Pilih Pembanding</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectPembanding',
  props: ['objek']
};
</script>

<style>
</style>