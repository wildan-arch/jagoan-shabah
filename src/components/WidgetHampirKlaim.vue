<template>
  <div v-if="anakHampirKlaim.length > 0" class="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-lg">🔥</span>
      <h3 class="font-bold text-amber-900 text-sm">Hampir Dapat Es Krim! (2/3 Stempel)</h3>
    </div>
    <div class="flex flex-wrap gap-2">
      <div v-for="anak in anakHampirKlaim" :key="anak.id" class="bg-white border border-amber-200 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs shadow-sm">
        <span class="font-semibold text-slate-800">{{ anak.nama }}</span>
        <span class="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
          {{ anak.tingkat }}
        </span>
        <span class="text-amber-500 font-bold">★★☆</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  anakList: { type: Array, default: () => [] },
});

const anakHampirKlaim = computed(() => {
  return props.anakList.filter((a) => a.jumlah_stempel === 2);
});
</script>
