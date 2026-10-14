<template>
  <!-- Menempel di bagian paling bawah layar -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-6 py-2 shadow-lg">
    <div class="max-w-md mx-auto flex justify-around items-center">
      <!-- Tab 1: Beranda / Kasir -->
      <button @click="$emit('changeTab', 'kasir')" class="flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl" :class="activeTab === 'kasir' ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-slate-400 font-medium'">
        <span class="text-xl">🏠</span>
        <span class="text-[11px]">Beranda</span>
      </button>

      <!-- Tab 2: Bank Soal (BARU) -->
      <button @click="$emit('changeTab', 'soal')" class="flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl" :class="activeTab === 'soal' ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-slate-400 font-medium'">
        <span class="text-xl">📚</span>
        <span class="text-[11px]">Bank Soal</span>
      </button>

      <!-- Tab 3: Laporan Keuangan -->
      <button @click="$emit('changeTab', 'laporan')" class="flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl" :class="activeTab === 'laporan' ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-slate-400 font-medium'">
        <span class="text-xl">📊</span>
        <span class="text-[11px]">Laporan</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  activeTab: { type: String, default: "kasir" },
});

defineEmits(["changeTab"]);
</script>
