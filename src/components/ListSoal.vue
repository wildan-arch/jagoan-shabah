<template>
  <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-bold">📚 Soal Aktif</h2>
      <button @click="$emit('openModalSoal')" class="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-700">+ Soal</button>
    </div>

    <div v-if="soalList.length === 0" class="text-center py-6 text-slate-400 text-sm">Belum ada soal aktif.</div>

    <div v-else class="space-y-3">
      <div v-for="s in soalList" :key="s.id" class="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
        <span class="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded" :class="getBadgeColor(s.tingkat)">
          {{ formatTingkat(s.tingkat) }}
        </span>
        <p class="text-sm font-medium mt-1 capitalize">{{ s.pertanyaan }}</p>
        <p v-if="s.kunci_jawaban" class="text-xs text-slate-500 mt-0.5 capitalize">Kunci: {{ s.kunci_jawaban }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  soalList: { type: Array, default: () => [] },
});

defineEmits(["openModalSoal"]);

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
