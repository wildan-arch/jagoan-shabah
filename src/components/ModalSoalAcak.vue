<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-slate-100">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <div>
          <span class="text-[11px] text-slate-400 font-bold uppercase block">TANTANGAN UNTUK</span>
          <h3 class="font-extrabold text-lg text-indigo-600 flex items-center gap-1.5">
            <span>🧒</span> {{ anak?.nama }}
            <span class="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md font-semibold">
              {{ anak?.tingkat }}
            </span>
          </h3>
        </div>
        <button @click="$emit('close')" :disabled="isKocok" class="text-slate-400 text-2xl font-bold hover:text-slate-600">&times;</button>
      </div>

      <!-- Soal -->
      <div class="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 min-h-[140px] flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow-sm" :class="isKocok ? 'bg-amber-400 text-amber-950 animate-bounce' : 'bg-indigo-600 text-white'">
            {{ isKocok ? "🎲 Mengocok..." : "✨ Soal Terpilih" }}
          </span>
        </div>

        <div class="my-3 text-center">
          <p v-if="isKocok" class="text-sm font-bold text-indigo-600 animate-pulse">Memilih pertanyaan acak...</p>
          <p v-else-if="soal" class="text-base font-bold text-slate-800 text-left">{{ soal.pertanyaan }}</p>
          <p v-else class="text-sm text-slate-400 italic">Belum ada soal aktif.</p>
        </div>

        <div v-if="!isKocok && soal?.kunci_jawaban" class="pt-2 border-t border-indigo-100 text-xs text-indigo-900"><strong>🔑 Kunci Jawaban:</strong> {{ soal.kunci_jawaban }}</div>
      </div>

      <!-- Tombol Aksi -->
      <div class="space-y-2 pt-2">
        <!-- Tombol Utama: Jawaban Benar -->
        <button v-if="!isKocok && soal" @click="$emit('jawabBenar', anak)" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2">
          <span>✅</span> Jawaban Benar (+1 Stempel)
        </button>

        <div class="flex justify-between items-center gap-2">
          <button @click="mulaiKocok" :disabled="isKocok" class="flex-1 py-2 px-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">🔄 Kocok Soal Lain</button>
          <button @click="$emit('close')" :disabled="isKocok" class="py-2 px-4 text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-semibold">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  anak: Object,
  soal: Object,
});

const emit = defineEmits(["close", "kocokLagi", "jawabBenar"]);

const isKocok = ref(false);

const mulaiKocok = () => {
  if (isKocok.value) return;
  isKocok.value = true;
  setTimeout(() => {
    emit("kocokLagi");
    isKocok.value = false;
  }, 800);
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) mulaiKocok();
  },
);
</script>
