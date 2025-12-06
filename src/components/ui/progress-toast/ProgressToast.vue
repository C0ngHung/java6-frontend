<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressToastProps {
  message: string
  duration?: number
  onProgressComplete?: () => void
  onApiComplete?: () => void
  class?: string
}

const props = withDefaults(defineProps<ProgressToastProps>(), {
  duration: 1000, // 1 giây để progress bar chạy nhanh hơn
})

const progress = ref(0)
const isProgressComplete = ref(false)
const isApiComplete = ref(false)
const isDownloading = ref(false)

const startProgress = () => {
  const interval = 16 // ~60fps
  const step = 99 / (props.duration / interval) // Chỉ chạy đến 99%

  const timer = setInterval(() => {
    progress.value += step

    if (progress.value >= 99) {
      progress.value = 99 // Dừng ở 99%
      isProgressComplete.value = true
      clearInterval(timer)

      // Thông báo progress đã chạy đến 99%
      props.onProgressComplete?.()
    }
  }, interval)
}

const checkCompletion = () => {
  // Nếu API đã xong nhưng progress chưa đến 99%, force progress đến 99%
  if (isApiComplete.value && !isProgressComplete.value) {
    progress.value = 99
    isProgressComplete.value = true

    // Delay nhỏ để user có thể thấy 99% trước khi chuyển sang 100%
    setTimeout(() => {
      checkCompletion()
    }, 100)
    return
  }

  if (isProgressComplete.value && isApiComplete.value) {
    // Progress ở 99% và API xong, nhảy lên 100%
    progress.value = 100

    // Hiển thị trạng thái đang tải file
    isDownloading.value = true

    // Delay để user thấy 100% và trạng thái "Đang tải file..."
    setTimeout(() => {
      props.onApiComplete?.()
    }, 500) // Tăng delay lên 0.5 giây để thấy rõ quá trình
  }
}

// Function để component cha gọi khi API hoàn thành
const markApiComplete = () => {
  isApiComplete.value = true
  checkCompletion()
}

// Expose function để component cha có thể gọi
defineExpose({
  markApiComplete,
})

onMounted(() => {
  startProgress()
})
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-2 p-4 min-w-[350px] bg-background border-border shadow-md rounded',
        props.class
      )
    "
  >
    <!-- Message -->
    <div class="flex items-center gap-2">
      <div class="h-2 w-2 rounded-full bg-primary animate-pulse" />
      <span class="text-sm font-medium">{{ props.message }}</span>
    </div>

    <!-- Progress Bar -->
    <div class="space-y-1">
      <Progress :model-value="progress" class="h-2" />
      <div class="flex justify-between text-xs text-muted-foreground">
        <span v-if="!isDownloading">Đang xử lý...</span>
        <span v-else>Đang tải file...</span>
        <span>{{ Math.round(progress) }}%</span>
      </div>
    </div>
  </div>
</template>
