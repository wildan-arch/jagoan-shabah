<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div class="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-xl">
      <h3 class="font-bold text-lg">Buat Soal Baru</h3>
      <select v-model="form.tingkat" class="w-full border p-2 rounded-xl text-sm focus:outline-indigo-500">
        <option value="PAUD">PAUD / TK</option>
        <option value="SD_KECIL">SD Kelas 1 - 3</option>
        <option value="SD_BESAR">SD Kelas 4 - 6</option>
      </select>
      <textarea v-model="form.pertanyaan" placeholder="Pertanyaan..." class="w-full border p-2 rounded-xl text-sm h-20 focus:outline-indigo-500"></textarea>
      <input v-model="form.kunci_jawaban" type="text" placeholder="Kunci Jawaban (Opsional)" class="w-full border p-2 rounded-xl text-sm focus:outline-indigo-500" />
      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 rounded-xl">Batal</button>
        <button @click="submit" class="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Simpan Soal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({ show: Boolean });
const emit = defineEmits(["close", "submit"]);

const form = ref({ tingkat: "PAUD", pertanyaan: "", kunci_jawaban: "" });

const submit = () => {
  if (!form.value.pertanyaan) return;
  emit("submit", { ...form.value });
  form.value = { tingkat: "PAUD", pertanyaan: "", kunci_jawaban: "" };
  emit("close");
};
</script>
