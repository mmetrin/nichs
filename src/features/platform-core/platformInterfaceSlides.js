import projectVideo from '../../assets/platform-core/videos/01_project_captioned.mp4'
import audienceVideo from '../../assets/platform-core/videos/02_cross_channel_captioned.mp4'
import targetingVideo from '../../assets/platform-core/videos/03_targeting_captioned.mp4'
import projectCover from '../../assets/platform-core/videos/01_cover.png'
import audienceCover from '../../assets/platform-core/videos/02_cover.png'
import targetingCover from '../../assets/platform-core/videos/03_cover.png'

export const platformInterfaceSlides = [
  {
    id: 'project', label: 'Создание проекта', video: projectVideo, cover: projectCover,
    title: 'Три рекламных канала — один проект',
    titleLines: ['Три рекламных канала', '— один проект'],
    description: 'Создайте кампании для Telegram, VK и Авито в одном проекте: задайте одинаковые сроки и отдельный бюджет для каждого канала. Так проще планировать запуск и контролировать рекламу на одном экране',
  },
  {
    id: 'audiences', label: 'Сохранение и исключение аудитории', video: audienceVideo, cover: audienceCover,
    title: 'Аудитории работают между каналами',
    titleLines: ['Аудитории работают', 'между каналами'],
    description: 'Сервис сохраняет аудиторию показов и кликов в Telegram и позволяет исключить её из кампании VK. Это помогает сократить повторные показы и точнее распределить рекламный бюджет',
  },
  {
    id: 'targeting', label: 'Настройки таргетов', video: targetingVideo, cover: targetingCover,
    title: 'Точная настройка аудитории Big Data',
    titleLines: ['Точная настройка', 'аудитории Big Data'],
    description: 'В настройках выбираются город и возраст, а прогноз охвата обновляется по мере выбора параметров. Так можно оценить размер аудитории ещё до запуска рекламы',
  },
]
