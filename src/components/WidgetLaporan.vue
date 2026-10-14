<template>
  <section class="bg-linear-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-2xl shadow-sm mb-8">
    <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <span class="text-xs font-semibold text-indigo-200 uppercase tracking-wider block">REKAP OPERASIONAL BULAN INI</span>
        <h3 class="text-xl font-bold mt-0.5">Laporan Keuangan & Reward 🍦</h3>
      </div>

      <div class="flex flex-wrap gap-4 items-center">
        <!-- Card 1: Total Es Krim -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-center min-w-30">
          <span class="text-[10px] text-indigo-200 font-medium block">TOTAL ES KRIM</span>
          <span class="text-xl font-extrabold text-amber-300">{{ totalEsKrim }} Bks</span>
        </div>

        <!-- Card 2: Estimasi Biaya -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-center min-w-35">
          <span class="text-[10px] text-indigo-200 font-medium block">ESTIMASI BIAYA</span>
          <span class="text-xl font-extrabold text-emerald-300">Rp {{ totalBiaya.toLocaleString("id-ID") }}</span>
        </div>

        <!-- Tombol Export -->
        <button @click="$emit('exportData')" class="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"><span>📥</span> Export CSV</button>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  totalEsKrim: { type: Number, default: 0 },
  totalBiaya: { type: Number, default: 0 },
});

defineEmits(["exportData"]);
</script>
