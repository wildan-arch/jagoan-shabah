<template>
  <header class="max-w-5xl mx-auto mb-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div>
      <h1 class="text-2xl font-bold text-indigo-600 flex items-center gap-2"><span>🍦</span> Kasir Jagoan Pintar</h1>
      <p class="text-sm text-slate-500">Apotek Management Dashboard</p>
    </div>
    <div class="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-right">
      <span class="text-xs font-semibold text-indigo-500 block">KUOTA HARI INI</span>
      <span class="text-lg font-bold" :class="kuota >= 10 ? 'text-rose-600' : 'text-indigo-700'"> {{ kuota }} / 10 Anak </span>

      <!-- Tombol Reset Kuota Manual -->
      <button
        @click="$emit('onResetKuota')"
        title="Reset Kuota Hari Ini"
        class="bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 p-2 rounded-xl text-xs transition flex items-center gap-1 font-bold"
      >
        <span>🔄</span>
        <span class="hidden sm:inline">Reset</span>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  kuota: { type: Number, default: 0 },
});

defineEmits(["onResetKuota"]);
</script>
