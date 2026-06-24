<template>
<div class="p-4" style="font-family: 'MS Sans Serif', sans-serif; color: black;">
    <!-- Heading -->
    <h2 class="font-bold text-xl pb-2 border-b-2 border-gray-400">ICPC 2024 Championship</h2>
    <h6 class="text-gray-600 font-medium text-xs pt-1 pb-4">Jordanian Collegiate Programming Contest (JCPC)</h6>

    <!-- Certificate Container -->
    <div class="mb-6">
        <h3 class="font-bold text-sm pb-2">Participation Certificate:</h3>
        <div class="relative border-2 border-dashed border-gray-500 bg-gray-200 flex flex-col items-center justify-center p-4 min-h-[220px]">
            <!-- Attempts to load the user's certificate image -->
            <img 
                :src="`${useRuntimeConfig().app.baseURL}files/icpc2024_cert.png`" 
                alt="ICPC 2024 Certificate" 
                class="w-full h-auto max-h-[300px] object-contain border border-gray-400 shadow-sm"
                @error="imageLoadError = true"
                v-if="!imageLoadError"
            />
            
            <!-- Fallback design if no image file is found yet -->
            <div v-else class="text-center p-6">
                <img src="@/assets/win95Icons/photos.png" class="mx-auto w-12 h-12 opacity-80 mb-3" />
                <p class="font-bold text-sm text-gray-800">Certificate Image Placeholder</p>
                <p class="text-xs text-gray-600 max-w-[320px] mt-2">
                    Please place your certificate image file in <strong>public/files/icpc2024_cert.png</strong> to display it here.
                </p>
            </div>
        </div>
    </div>

    <!-- Story Section -->
    <div class="pt-2">
        <h3 class="underline font-bold text-md pb-2">The Contest Story</h3>
        <p class="font-thin text-sm leading-relaxed pb-3">
            Returning to the Jordanian Collegiate Programming Contest (JCPC) in 2024 was an opportunity to apply a whole year of learning, algorithms optimization, and teamwork strategies. The atmosphere was highly charged, bringing together Jordan's top competitive programmers for another grueling 5-hour test of mental focus.
        </p>
        <p class="font-thin text-sm leading-relaxed pb-3">
            With sharper problem-solving speed and refined coordination, our team was able to tackle complex graph theories, combinatorial mathematics, and dynamic programming tasks. Facing challenging edge cases under the ticking clock was both demanding and deeply rewarding.
        </p>
        <p class="font-thin text-sm leading-relaxed">
            The ICPC 2024 event was a testament to our continuous growth and persistence. The thrill of competitive programming continues to drive my dedication to writing highly optimized, architectural code.
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
