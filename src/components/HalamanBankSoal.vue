<template>
  <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
      <div>
        <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2"><span>📚</span> Bank Soal Tantangan</h2>
        <p class="text-xs text-slate-500">Kelola daftar pertanyaan harian untuk setiap kategori usia.</p>
      </div>
      <button @click="$emit('openModalSoal')" class="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm">+ Tambah Soal Baru</button>
    </div>

    <!-- Filter Kategori Soal -->
    <div class="flex gap-2 border-b pb-3 overflow-x-auto">
      <button
        v-for="kat in categories"
        :key="kat.value"
        @click="selectedCategory = kat.value"
        class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition"
        :class="selectedCategory === kat.value ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
      >
        {{ kat.label }}
      </button>
    </div>

    <!-- Grid Daftar Soal -->
    <div v-if="filteredSoal.length === 0" class="text-center py-12 text-slate-400 text-sm">Belum ada soal untuk kategori ini.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="s in filteredSoal" :key="s.id" class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 relative">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded" :class="getBadgeColor(s.tingkat)">
            {{ formatTingkat(s.tingkat) }}
          </span>
          <span class="text-xs text-emerald-600 font-medium">● Aktif</span>
        </div>
        <p class="text-sm font-semibold text-slate-800">{{ s.pertanyaan }}</p>
        <p v-if="s.kunci_jawaban" class="text-xs text-slate-500 bg-white p-2 rounded-lg border border-slate-100 capitalize">🔑 <strong>Kunci:</strong> {{ s.kunci_jawaban }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  soalList: { type: Array, default: () => [] },
});

defineEmits(["openModalSoal"]);

const selectedCategory = ref("ALL");

const categories = [
  { label: "Semua Kategori", value: "ALL" },
  { label: "PAUD / TK", value: "PAUD" },
  { label: "SD Kelas 1-3", value: "SD_KECIL" },
  { label: "SD Kelas 4-6", value: "SD_BESAR" },
];

const filteredSoal = computed(() => {
  if (selectedCategory.value === "ALL") return props.soalList;
  return props.soalList.filter((s) => s.tingkat === selectedCategory.value);
});

const formatTingkat = (t) => {
  if (t === "PAUD") return "PAUD / TK";
  if (t === "SD_KECIL") return "SD Kelas 1-3";
  return "SD Kelas 4-6";
};

const getBadgeColor = (t) => {
  if (t === "PAUD") return "bg-emerald-100 text-emerald-700";
  if (t === "SD_KECIL") return "bg-amber-100 text-amber-700";
  return "bg-indigo-100 text-indigo-700";
};
</script>
