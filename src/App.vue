<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 pb-24">
    <!-- Header -->
    <Header :kuota="totalKuotaHariIni" @on-reset-kuota="handleResetKuota" />

    <!-- TAB 1: BERANDA / KASIR -->
    <main v-if="activeTab === 'kasir'" class="max-w-5xl mx-auto space-y-4">
      <WidgetHampirKlaim :anak-list="daftarAnak" />

      <TableAnak :anak-list="filteredAnak" v-model:search-query="searchQuery" @open-modal-anak="showModalAnak = true" @on-acak-soal="handleAcakSoal" @on-tambah-stempel="handleTambahStempel" @on-klaim-es-krim="handleKlaimEsKrim" />
    </main>

    <!-- TAB 2: BANK SOAL -->
    <main v-else-if="activeTab === 'soal'" class="max-w-5xl mx-auto">
      <HalamanBankSoal :soal-list="daftarSoal" @open-modal-soal="showModalSoal = true" />
    </main>

    <!-- TAB 3: LAPORAN KEUANGAN -->
    <main v-else-if="activeTab === 'laporan'" class="max-w-5xl mx-auto space-y-6">
      <WidgetLaporan :total-es-krim="totalEsKrimBulanIni" :total-biaya="totalPengeluaranBulanIni" @export-data="exportToCSV(daftarAnak)" />

      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div class="flex justify-between items-center border-b pb-4">
          <div>
            <h3 class="font-bold text-lg text-slate-800">📋 Ringkasan Data Anak & Es Krim</h3>
            <p class="text-xs text-slate-500">Tinjau klaim es krim seluruh anak pemegang kartu.</p>
          </div>
          <button @click="exportToCSV(daftarAnak)" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"><span>📥</span> Download CSV</button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-xs text-slate-400 uppercase">
                <th class="py-3 px-2">Nama Anak</th>
                <th class="py-3 px-2">Kategori</th>
                <th class="py-3 px-2 text-center">Stempel Saat Ini</th>
                <th class="py-3 px-2 text-center">Total Es Krim Diklaim</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="anak in daftarAnak" :key="anak.id">
                <td class="py-3 px-2 font-semibold">{{ anak.nama }}</td>
                <td class="py-3 px-2 text-xs text-slate-500">{{ anak.tingkat }}</td>
                <td class="py-3 px-2 text-center font-bold text-indigo-600">{{ anak.jumlah_stempel }} / 3</td>
                <td class="py-3 px-2 text-center">
                  <span class="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold"> 🍦 {{ anak.total_es_krim_diklaim || 0 }} Bks </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- Bottom Navigation Bar -->
    <BottomNav :active-tab="activeTab" @change-tab="(tab) => (activeTab = tab)" />

    <!-- Modals -->
    <ModalAnak :show="showModalAnak" @close="showModalAnak = false" @submit="tambahAnak" />
    <ModalSoal :show="showModalSoal" @close="showModalSoal = false" @submit="tambahSoal" />
    <ModalSoalAcak :show="showModalAcak" :anak="selectedAnak" :soal="selectedSoal" @close="showModalAcak = false" @kocok-lagi="kocokSoalLagi" @jawab-benar="handleJawabBenar" />
    <!-- Tambahkan Modal Selebrasi di bagian <template> -->
    <ModalSelebrasi :show="showModalSelebrasi" :anak="anakKlaimTerakhir" @close="showModalSelebrasi = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAnak } from "./composables/useAnak";
import { useSoal } from "./composables/useSoal";
import { useKuota } from "./composables/useKuota";
import { useLaporan } from "./composables/useLaporan";

import Header from "./components/Header.vue";
import TableAnak from "./components/TableAnak.vue";
import WidgetHampirKlaim from "./components/WidgetHampirKlaim.vue";
import HalamanBankSoal from "./components/HalamanBankSoal.vue";
import WidgetLaporan from "./components/WidgetLaporan.vue";
import BottomNav from "./components/BottomNav.vue";
import ModalAnak from "./components/ModalAnak.vue";
import ModalSoal from "./components/ModalSoal.vue";
import ModalSoalAcak from "./components/ModalSoalAcak.vue";
import ModalSelebrasi from "./components/ModalSelebrasi.vue";

const { daftarAnak, filteredAnak, searchQuery, fetchAnak, tambahAnak, updateStempel, resetKlaimEsKrim } = useAnak();
const { daftarSoal, fetchSoal, tambahSoal, dapatkanSoalAcak } = useSoal();
const { totalKuotaHariIni, fetchKuotaHariIni, sudahStempelHariIni, catatLogStempel } = useKuota();
const { totalEsKrimBulanIni, totalPengeluaranBulanIni, fetchLaporanBulanIni, catatKlaimEsKrim, exportToCSV } = useLaporan();

const activeTab = ref("kasir");

const showModalAnak = ref(false);
const showModalSoal = ref(false);
const showModalAcak = ref(false);
const showModalSelebrasi = ref(false);
const anakKlaimTerakhir = ref(null);

const selectedAnak = ref(null);
const selectedSoal = ref(null);

const handleAcakSoal = (anak) => {
  selectedAnak.value = anak;
  selectedSoal.value = dapatkanSoalAcak(anak.tingkat);
  showModalAcak.value = true;
};

const kocokSoalLagi = () => {
  if (selectedAnak.value) {
    selectedSoal.value = dapatkanSoalAcak(selectedAnak.value.tingkat);
  }
};

// Fungsi Utama Penambahan Stempel
const handleTambahStempel = async (anak) => {
  // 1. Cek Kuota
  if (totalKuotaHariIni.value >= 10) {
    alert("⚠️ Kuota 10 anak hari ini sudah Penuh! Silakan kembali besok.");
    return false;
  }

  // 2. Cek Apakah Sudah Stempel Hari Ini (Mencegah Double)
  const sudahAmbil = await sudahStempelHariIni(anak.id);
  if (sudahAmbil) {
    alert(`⚠️ Oops! ${anak.nama} SUDAH mengambil stempel hari ini. Kuota harian 1 stempel/anak.`);
    return false;
  }

  // 3. Tambahkan Stempel
  await updateStempel(anak.id, anak.jumlah_stempel + 1);
  await catatLogStempel(anak.id);
  alert(`🎉 Berhasil! Stempel untuk ${anak.nama} berhasil ditambahkan (${anak.jumlah_stempel + 1}/3).`);
  return true;
};

// Handler ketika tombol "✅ Jawaban Benar" di modal diklik
const handleJawabBenar = async (anak) => {
  const berhasil = await handleTambahStempel(anak);
  if (berhasil) {
    showModalAcak.value = false; // Otomatis tutup modal jika berhasil
  }
};

const handleKlaimEsKrim = async (anak) => {
  if (confirm(`Tukarkan 3 stempel ${anak.nama} dengan 1 Es Krim?`)) {
    await resetKlaimEsKrim(anak);
    await catatKlaimEsKrim(anak.id);

    // Tampilkan modal selebrasi seolah-olah anak menang!
    anakKlaimTerakhir.value = anak;
    showModalSelebrasi.value = true;
  }
};

const handleResetKuota = async () => {
  if (confirm("Yakin ingin mereset kuota hari ini menjadi 0/10? (Data stempel anak tetap aman)")) {
    await resetKuotaHariIni();
  }
};

onMounted(() => {
  fetchAnak();
  fetchSoal();
  fetchKuotaHariIni();
  fetchLaporanBulanIni();
});
</script>
