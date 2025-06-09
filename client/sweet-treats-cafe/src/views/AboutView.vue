<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-16 transform hover:shadow-xl transition-shadow duration-300">
        <div class="md:flex">
          <div class="md:flex-shrink-0 md:w-1/3">
            <div class="flex items-center justify-center p-6 bg-gradient-to-br from-pink-100 to-indigo-50">
              <img class="h-48 w-auto object-contain drop-shadow-md" src="@/assets/logo.png" alt="Sweet Treats Cafe Logo">
            </div>
          </div>
          <div class="p-8 md:p-12 md:w-2/3">
            <div class="uppercase tracking-wide text-sm text-indigo-600 font-semibold">Về chúng tôi</div>
            <h1 class="mt-2 text-3xl font-extrabold text-gray-900 leading-tight">
              Sweet Treats Cafe
            </h1>
            <p class="mt-4 text-gray-600 leading-relaxed">
              Chào mừng bạn đến với Sweet Treats Cafe - nơi mỗi chiếc bánh và đồ uống đều được làm thủ công với tình yêu và sự tận tâm. Chúng tôi tin rằng những khoảnh khắc ngọt ngào nhất trong cuộc sống xứng đáng được tôn vinh bằng những món ngọt tuyệt hảo.
            </p>
          </div>
        </div>
      </div>

      <!-- Our Story Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center relative">
          <span class="inline-block relative">
            Câu chuyện của chúng tôi
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-500"></span>
          </span>
        </h2>
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div class="max-w-3xl mx-auto">
            <p class="text-gray-600 mb-4">
              Sweet Treats Cafe được thành lập vào năm 2020 bởi những người đam mê ẩm thực ngọt ngào. Chúng tôi bắt đầu như một tiệm bánh nhỏ, nhưng với tình yêu và sự ủng hộ từ khách hàng, chúng tôi đã phát triển thành một điểm đến yêu thích cho những ai yêu thích bánh ngọt và đồ uống thơm ngon.
            </p>
            <p class="text-gray-600 mb-4">
              Triết lý của chúng tôi rất đơn giản: sử dụng nguyên liệu tươi ngon nhất, làm mọi thứ từ đầu, và luôn đặt khách hàng lên hàng đầu. Chúng tôi tin rằng mỗi chiếc bánh, mỗi ly cà phê đều là mội cơ hội để tạo ra niềm vui và kỷ niệm đáng nhớ.
            </p>
            <p class="text-gray-600">
              Hôm nay, Sweet Treats Cafe tự hào phục vụ hàng trăm khách hàng mỗi ngày, mang đến không chỉ những món ăn ngon mà còn là không gian ấm cúng để mọi người có thể gặp gỡ, trò chuyện và tận hưởng những khoảnh khắc ngọt ngào của cuộc sống.
            </p>
          </div>
        </div>
      </div>

      <!-- Our Values Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center relative">
          <span class="inline-block relative">
            Giá trị cốt lõi
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-500"></span>
          </span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Chất lượng</h3>
            <p class="text-gray-600">
              Chúng tôi không bao giờ thỏa hiệp về chất lượng. Mỗi sản phẩm đều được làm từ những nguyên liệu tốt nhất và được kiểm soát chất lượng nghiêm ngặt.
            </p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sáng tạo</h3>
            <p class="text-gray-600">
              Chúng tôi luôn tìm tòi và sáng tạo những công thức mới, kết hợp giữa truyền thống và hiện đại để mang đến những trải nghiệm ẩm thực độc đáo.
            </p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Tận tâm</h3>
            <p class="text-gray-600">
              Chúng tôi đặt tâm huyết vào từng sản phẩm và dịch vụ. Sự hài lòng của khách hàng là niềm vui và động lực để chúng tôi không ngừng phát triển.
            </p>
          </div>
        </div>
      </div>

      <!-- Our Team Section -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center relative">
          <span class="inline-block relative">
            Đội ngũ của chúng tôi
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-indigo-500"></span>
          </span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
          <div v-for="(member, index) in teamMembers" :key="index"
               class="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer"
               @click="openMemberDetails(index)">
            <img class="w-full h-64 object-cover" :src="member.image" :alt="member.name">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900">{{ member.name }}</h3>
              <p class="text-indigo-500 mb-2">{{ member.position }}</p>
              <p class="text-gray-600 text-sm">
                {{ member.shortBio }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Modal for team member details -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="closeModal">
          <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
            <div class="relative">
              <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div v-if="selectedMember" class="p-6">
                <div class="flex flex-col md:flex-row gap-6">
                  <div class="md:w-1/3">
                    <img :src="selectedMember.image" :alt="selectedMember.name" class="w-full h-auto rounded-lg shadow-md">
                  </div>
                  <div class="md:w-2/3">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedMember.name }}</h2>
                    <p class="text-indigo-600 font-medium mb-4">{{ selectedMember.position }}</p>
                    
                    <div class="mb-4">
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">Giới thiệu</h3>
                      <p class="text-gray-600">{{ selectedMember.fullBio }}</p>
                    </div>
                    
                    <div class="mb-4">
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">Chuyên môn</h3>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="(skill, i) in selectedMember.skills" :key="i" 
                              class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">Liên hệ</h3>
                      <div class="flex space-x-4">
                        <a href="#" class="text-indigo-500 hover:text-indigo-700">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                        <a href="#" class="text-indigo-500 hover:text-indigo-700">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chef1Image from '@/assets/chef1.png'
import chef2Image from '@/assets/chef2.png'
import baristaImage from '@/assets/barista.png'
import managerImage from '@/assets/manager.png'

export default {
  name: 'AboutView',
  data() {
    return {
      showModal: false,
      selectedMemberIndex: null,
      teamMembers: [
        {
          name: 'Nguyễn Thị Ngọc Nhung',
          position: 'Bếp trưởng',
          image: chef1Image, // Use the imported image
          shortBio: 'Với hơn 10 năm kinh nghiệm trong lĩnh vực bánh ngọt, Chef Nhung là linh hồn của những công thức độc đáo tại Sweet Treats.',
          fullBio: 'Chef Nhung tốt nghiệp từ Học viện Ẩm thực Paris và đã làm việc tại nhiều nhà hàng 5 sao trước khi gia nhập Sweet Treats Cafe. Với hơn 10 năm kinh nghiệm, Chef Nhung đã phát triển hơn 100 công thức bánh độc đáo, kết hợp giữa hương vị truyền thống và hiện đại. Niềm đam mê với bánh ngọt và sự tỉ mỉ trong từng chi tiết đã giúp Chef Nhung trở thành linh hồn của Sweet Treats Cafe.',
          skills: ['Bánh Âu', 'Bánh Á', 'Trang trí bánh', 'Phát triển công thức']
        },
        {
          name: 'Lê Văn Quyến',
          position: 'Bếp phó',
          image: chef2Image, // Use the imported image
          shortBio: 'Chef Quyến chuyên về bánh Âu và luôn mang đến những chiếc bánh với hương vị tinh tế và hình thức đẹp mắt.',
          fullBio: 'Chef Quyến có 8 năm kinh nghiệm làm bánh và đặc biệt chuyên sâu về bánh Âu. Sau khi tốt nghiệp từ Học viện Ẩm thực Việt Nam, Chef Quyến đã theo học thêm các khóa chuyên sâu về bánh ngọt tại Ý và Pháp. Sự sáng tạo và khả năng trang trí tinh tế của Chef Quyến đã mang đến những chiếc bánh không chỉ ngon miệng mà còn đẹp mắt, trở thành điểm nhấn của Sweet Treats Cafe.',
          skills: ['Bánh Âu', 'Chocolate', 'Trang trí bánh', 'Donut']
        },
        {
          name: 'Vũ Đức Thảo',
          position: 'Barista trưởng',
          image: baristaImage, // Use the imported image
          shortBio: 'Với đam mê về cà phê, Thảo mang đến những ly đồ uống hoàn hảo từ hương vị đến nghệ thuật latte art.',
          fullBio: 'Thảo đã có 6 năm kinh nghiệm trong ngành cà phê và đã giành được nhiều giải thưởng trong các cuộc thi Barista cấp quốc gia. Thảo không chỉ am hiểu về các loại hạt cà phê từ khắp nơi trên thế giới mà còn là một nghệ sĩ trong việc tạo ra những tác phẩm latte art đẹp mắt. Dưới sự hướng dẫn của Thảo, đội ngũ barista tại Sweet Treats Cafe luôn mang đến những ly đồ uống hoàn hảo từ hương vị đến hình thức.',
          skills: ['Espresso', 'Các loại trà', 'Pha chế đồ uống', 'Latte Art']
        },
        {
          name: 'Huỳnh Quốc Đăng',
          position: 'Quản lý',
          image: managerImage, // Use the imported image
          shortBio: 'Đăng đảm bảo mọi hoạt động của Sweet Treats diễn ra suôn sẻ và mỗi khách hàng đều có trải nghiệm tuyệt vời.',
          fullBio: 'Đăng tốt nghiệp ngành Quản trị Khách sạn và đã có 7 năm kinh nghiệm trong lĩnh vực F&B. Với khả năng quản lý xuất sắc và tinh thần làm việc nhóm, Đăng đảm bảo mọi hoạt động của Sweet Treats Cafe diễn ra suôn sẻ từ khâu chuẩn bị nguyên liệu đến phục vụ khách hàng. Đăng luôn đặt sự hài lòng của khách hàng lên hàng đầu và không ngừng cải thiện chất lượng dịch vụ tại Sweet Treats Cafe.',
          skills: ['Quản lý nhân sự', 'Dịch vụ khách hàng', 'Quản lý vận hành', 'Marketing']
        }
      ]
    }
  },
  computed: {
    selectedMember() {
      return this.selectedMemberIndex !== null ? this.teamMembers[this.selectedMemberIndex] : null;
    }
  },
  methods: {
    openMemberDetails(index) {
      this.selectedMemberIndex = index;
      this.showModal = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
}
</script>

<style scoped>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #ec4899, #6366f1);
}

/* Modal animation */
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.bg-white {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
