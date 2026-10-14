<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-xl">
      <h3 class="font-bold text-lg">Tambah Anak Baru</h3>
      <input v-model="form.nama" type="text" placeholder="Nama Lengkap Anak" class="w-full border p-2 rounded-xl text-sm focus:outline-indigo-500" />
      <select v-model="form.tingkat" class="w-full border p-2 rounded-xl text-sm focus:outline-indigo-500">
        <option value="PAUD">PAUD / TK</option>
        <option value="SD_KECIL">SD Kelas 1 - 3</option>
        <option value="SD_BESAR">SD Kelas 4 - 6</option>
      </select>
      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-xl">Batal</button>
        <button @click="submit" class="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({ show: Boolean });
const emit = defineEmits(["close", "submit"]);

const form = ref({ nama: "", tingkat: "PAUD" });

const submit = () => {
  if (!form.value.nama) return;
  emit("submit", { ...form.value });
  form.value = { nama: "", tingkat: "PAUD" };
  emit("close");
};
</script>
