<template>
  <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
      <h2 class="text-lg font-bold">🧒 Data Anak Pemegang Kartu</h2>
      <div class="flex gap-2">
        <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)" type="text" placeholder="Cari nama anak..." class="px-3 py-1.5 text-sm border rounded-xl w-full sm:w-48 focus:outline-indigo-500" />
        <button @click="$emit('openModalAnak')" class="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-emerald-700 whitespace-nowrap">+ Anak Baru</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-100 text-xs text-slate-400 uppercase">
            <th class="py-3 px-2">Nama</th>
            <th class="py-3 px-2">Kategori</th>
            <th class="py-3 px-2 text-center">Stempel</th>
            <th class="py-3 px-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-sm">
          <tr v-for="item in anakList" :key="item.id">
            <td class="py-3 px-2 font-semibold capitalize">{{ item.nama }}</td>
            <td class="py-3 px-2 text-xs text-slate-500">{{ item.tingkat }}</td>
            <td class="py-3 px-2 text-center">
              <span class="inline-flex gap-1">
                <span v-for="i in 3" :key="i" class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" :class="i <= item.jumlah_stempel ? 'bg-amber-400 text-white' : 'bg-slate-100 text-slate-300'"> ★ </span>
              </span>
            </td>
            <td class="py-3 px-2 text-right space-x-2">
              <!-- Tombol Acak Soal khusus untuk anak ini -->
              <button @click="$emit('onAcakSoal', item)" class="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-slate-200">🎲 Tes Soal</button>
              <button v-if="item.jumlah_stempel < 3" @click="$emit('onTambahStempel', item)" class="bg-indigo-50 text-indigo-600 border border-indigo-200 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-indigo-100">+ Stempel</button>
              <button v-else @click="$emit('onKlaimEsKrim', item)" class="bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-amber-600 animate-pulse">🍦 Klaim Es Krim</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
defineProps({
  anakList: { type: Array, default: () => [] },
  searchQuery: { type: String, default: "" },
});

defineEmits(["update:searchQuery", "openModalAnak", "onAcakSoal", "onTambahStempel", "onKlaimEsKrim"]);
</script>
