<script setup>
import {
    useWindowsStore
} from '@/stores/windows'
const windowsStore = useWindowsStore()
</script>

<template>
<div style="display: flex; height: 100%; flex-direction: column">
    <nav class="download-bar">
        <a href="/files/resume.pdf" class="download" style="z-index: 10" download target="_blank">
            <span style="display: flex" class="border">
                <img src="@/assets/Resume/download.png" class="icon-image" />
                <p style="margin-top: 2px">Download</p>
            </span>
        </a>

        <a href="/files/resume.pdf" class="download" style="z-index: 10" target="_blank">
            <span style="display: flex" class="border">
                <img src="@/assets/Resume/open.png" class="icon-image" />
                <p style="margin-top: 2px">Open In New Tab</p>
            </span>
        </a>
    </nav>
    <div class="frame retro-placeholder" style="z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgb(192, 192, 192); border: 2px solid; border-color: rgb(128, 128, 128) white white rgb(128, 128, 128); padding: 20px; text-align: center;">
        <img src="@/assets/win95Icons/resume.png" style="width: 32px; height: 32px; margin-bottom: 15px;" />
        <p style="color: black; font-weight: bold; font-size: 14px; margin-bottom: 10px;">Résumé Preview</p>
        <p style="color: rgb(80, 80, 80); font-size: 12px; max-width: 280px; line-height: 1.5;">
            To view or print the résumé, please click on the **Download** or **Open In New Tab** button in the bar above.
        </p>
        <span v-if="windowsStore.activeWindow != 'ResumeWindow'" style="bottom: 0; left: 0; width: 100%; height: 95%; position: absolute" class="overlay"></span>
    </div>
</div>
</template>

  
  
<style scoped>
.download {
    vertical-align: middle;
    box-shadow: 1.5px 1.5px black;
    border-top: solid rgb(250, 250, 250) 1.5px;
    border-left: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    background: rgb(192, 192, 192);
    padding: 2px;
    margin-right: 5px;
}

.download:active {
    box-shadow: none;
    background: repeating-conic-gradient(rgb(189, 190, 189) 0% 25%,
            rgb(255, 255, 255) 0% 50%) 50% / 2px 2px;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

.download-bar {
    border: 1px white solid;
    outline: 1px rgb(123, 125, 123) solid;
    font-size: 12px;
    padding: 4px 4px 4px 4px;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.icon-image {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    margin-top: 0;
    margin-bottom: 0;
}

.border {
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    font-family: "MS Sans Serif";
    src: url("~@/assets/fonts/MS-Sans-Serif.ttf");
}

.border:active {
    border: black dotted 1px;
}

.download:hover {
    cursor: pointer;
}

.frame {
    width: 100%;
    height: 97.5%;
}
</style>
