<template>
<div class="p-4" style="font-family: 'MS Sans Serif', sans-serif; color: black;">
    <!-- Heading -->
    <h2 class="font-bold text-xl pb-2 border-b-2 border-gray-400">ICPC 2023 Championship</h2>
    <h6 class="text-gray-600 font-medium text-xs pt-1 pb-4">Jordanian Collegiate Programming Contest (JCPC)</h6>

    <!-- Certificate Container -->
    <div class="mb-6">
        <h3 class="font-bold text-sm pb-2">Participation Certificate:</h3>
        <div class="relative border-2 border-dashed border-gray-500 bg-gray-200 flex flex-col items-center justify-center p-4 min-h-[220px]">
            <!-- Attempts to load the user's certificate image -->
            <img 
                :src="'/files/icpc2023_cert.png'" 
                alt="ICPC 2023 Certificate" 
                class="w-full h-auto max-h-[300px] object-contain border border-gray-400 shadow-sm"
                @error="imageLoadError = true"
                v-if="!imageLoadError"
            />
            
            <!-- Fallback design if no image file is found yet -->
            <div v-else class="text-center p-6">
                <img src="@/assets/win95Icons/file.png" class="mx-auto w-12 h-12 opacity-80 mb-3" />
                <p class="font-bold text-sm text-gray-800">Certificate Image Placeholder</p>
                <p class="text-xs text-gray-600 max-w-[320px] mt-2">
                    Please place your certificate image file in <strong>public/files/icpc2023_cert.png</strong> to display it here.
                </p>
            </div>
        </div>
    </div>

    <!-- Story Section -->
    <div class="pt-2">
        <h3 class="underline font-bold text-md pb-2">The Contest Story</h3>
        <p class="font-thin text-sm leading-relaxed pb-3">
            In 2023, I competed in the Jordanian Collegiate Programming Contest (JCPC), the premier competitive programming championship in the country. Competing against talented problem solvers from universities across Jordan, this was an intense, high-pressure 5-hour journey of algorithmic strategy, mathematical modeling, and fast-paced implementation.
        </p>
        <p class="font-thin text-sm leading-relaxed pb-3">
            Our team collaborated closely under pressure, debugging complex data structures, optimizing graph algorithms, and tackling challenging dynamic programming problems. The contest truly pushed the boundaries of our analytical reasoning, problem-solving skills, and teamwork.
        </p>
        <p class="font-thin text-sm leading-relaxed">
            Earning our standing among the top regional contenders was a major highlight of my collegiate journey. This experience cemented my passion for understanding deep software mechanics, performance optimization, and clean, efficient problem-solving.
        </p>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const imageLoadError = ref(false);
</script>

<style scoped>
.font-thin {
    font-weight: 300;
}
</style>
