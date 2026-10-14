<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-amber-200 animate-bounce-short">
      <div class="text-6xl animate-bounce">🍦🎉</div>
      <div>
        <h3 class="text-xl font-extrabold text-amber-600">SELAMAT!</h3>
        <p class="text-sm text-slate-600 mt-1">
          <strong class="text-indigo-600">{{ anak?.nama }}</strong> berhasil menukarkan 3 stempel dengan 1 Es Krim Gratis!
        </p>
      </div>

      <div class="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-xs text-amber-800">Kartu stempel telah di-reset ke 0. {{ anak?.nama }} siap memulai tantangan baru! 🚀</div>

      <button @click="$emit('close')" class="w-full py-2.5 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 shadow-md shadow-amber-200 transition">Selesai & Serahkan Es Krim</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  anak: Object,
});

defineEmits(["close"]);
</script>

<style scoped>
@keyframes bounceShort {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}
.animate-bounce-short {
  animation: bounceShort 0.3s ease-out;
}
</style>
