<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Liên hệ với chúng tôi</h1>
        <p class="max-w-2xl mx-auto text-gray-600">
          Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi, góp ý hoặc yêu cầu nào.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-xl shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input 
                v-model="form.name"
                type="text" 
                id="name" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                id="email" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Nhập địa chỉ email của bạn"
                required
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
              <input 
                v-model="form.subject"
                type="text" 
                id="subject" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Nhập chủ đề"
                required
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Tin nhắn</label>
              <textarea 
                v-model="form.message"
                id="message" 
                rows="5" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Nhập nội dung tin nhắn"
                required
              ></textarea>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center"
                :disabled="isSubmitting"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn' }}
              </button>
            </div>
          </form>
          
          <!-- Banner Image -->
          <div class="mt-8 rounded-xl overflow-hidden shadow-lg">
            <img src="@/assets/banner-product-1.png" alt="Sweet Treats Banner" class="w-full h-auto max-w-full max-h-[400px] object-cover" />
          </div>
          
          <!-- Success message -->
          <div v-if="formSubmitted" class="mt-6 p-4 bg-green-50 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Error message -->
          <div v-if="formError" class="mt-6 p-4 bg-red-50 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">
                  Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ qua số điện thoại.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div>
          <div class="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Địa chỉ</h3>
                  <p class="mt-1 text-gray-600">
                    601 Thống Nhất<br>
                    Quận Gò Vấp, TP.HCM
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Điện thoại</h3>
                  <p class="mt-1 text-gray-600">(84+) 0345-394-305</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Email</h3>
                  <p class="mt-1 text-gray-600">sweettreatscafe@gmail.com</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Giờ mở cửa</h3>
                  <p class="mt-1 text-gray-600">
                    Thứ 2 - Thứ 6: 7:00 - 21:00<br>
                    Thứ 7 - Chủ nhật: 8:00 - 22:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Map -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4821.608719322495!2d106.6609519758389!3d10.848474457859043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ba6242ebb5%3A0xe589709ecf06212d!2zNjAxLzMzLzUyIMSQLiBUaOG7kW5nIE5o4bqldCwgUGjGsOG7nW5nIDE2LCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2sus!4v1748087094342!5m2!1svi!2sus" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Câu hỏi thường gặp</h2>
        
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="divide-y divide-gray-200">
            <div class="p-6">
              <button @click="toggleFaq(1)" class="flex justify-between items-center w-full text-left">
                <h3 class="text-lg font-medium text-gray-900">Làm thế nào để đặt bánh sinh nhật?</h3>
                <svg :class="{'rotate-180': openFaq === 1}" class="h-5 w-5 text-indigo-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaq === 1" class="mt-3 text-gray-600 transition-all duration-200">
                <p>Bạn có thể đặt bánh sinh nhật bằng cách liên hệ trực tiếp với chúng tôi qua số điện thoại hoặc email. Vui lòng đặt trước ít nhất 2-3 ngày để chúng tôi có thể chuẩn bị bánh theo yêu cầu của bạn.</p>
              </div>
            </div>
            
            <div class="p-6">
              <button @click="toggleFaq(2)" class="flex justify-between items-center w-full text-left">
                <h3 class="text-lg font-medium text-gray-900">Sweet Treats có dịch vụ giao hàng không?</h3>
                <svg :class="{'rotate-180': openFaq === 2}" class="h-5 w-5 text-indigo-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaq === 2" class="mt-3 text-gray-600 transition-all duration-200">
                <p>Có, chúng tôi có dịch vụ giao hàng trong phạm vi 10km từ cửa hàng. Phí giao hàng sẽ được tính dựa trên khoảng cách. Đối với đơn hàng trên 500.000 VND, chúng tôi sẽ miễn phí giao hàng trong phạm vi 5km.</p>
              </div>
            </div>
            
            <div class="p-6">
              <button @click="toggleFaq(3)" class="flex justify-between items-center w-full text-left">
                <h3 class="text-lg font-medium text-gray-900">Các sản phẩm có chứa gluten không?</h3>
                <svg :class="{'rotate-180': openFaq === 3}" class="h-5 w-5 text-indigo-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaq === 3" class="mt-3 text-gray-600 transition-all duration-200">
                <p>Hầu hết các sản phẩm của chúng tôi đều chứa gluten. Tuy nhiên, chúng tôi cũng có một số lựa chọn không chứa gluten. Vui lòng thông báo cho nhân viên về nhu cầu ăn kiêng của bạn khi đặt hàng.</p>
              </div>
            </div>
            
            <div class="p-6">
              <button @click="toggleFaq(4)" class="flex justify-between items-center w-full text-left">
                <h3 class="text-lg font-medium text-gray-900">Tôi có thể tổ chức sự kiện tại Sweet Treats không?</h3>
                <svg :class="{'rotate-180': openFaq === 4}" class="h-5 w-5 text-indigo-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="openFaq === 4" class="mt-3 text-gray-600 transition-all duration-200">
                <p>Có, chúng tôi cung cấp dịch vụ tổ chức sự kiện như sinh nhật, họp mặt nhỏ, hoặc workshop. Vui lòng liên hệ với chúng tôi trước ít nhất 1 tuần để đặt lịch và thảo luận về chi tiết.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

export default {
  name: 'ContactView',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    const isSubmitting = ref(false)
    const formSubmitted = ref(false)
    const formError = ref(false)
    const openFaq = ref(null)
    
    const submitForm = async () => {
      isSubmitting.value = true
      formError.value = false
      
      try {
        // Prepare template parameters
        const templateParams = {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message
        }
        
        // Send email using EmailJS
        // Replace these with your actual EmailJS service ID, template ID, and public key
        await emailjs.send(
          'service_cbqqgob', // Create a service in EmailJS dashboard and put ID here
          'template_kwcg0v4', // Create an email template and put ID here
          templateParams,
          'JdREvUiM9vRAj4EZi' // Your EmailJS public key
        )
        
        // Reset form and show success message
        form.name = ''
        form.email = ''
        form.subject = ''
        form.message = ''
        
        formSubmitted.value = true
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSubmitted.value = false
        }, 5000)
      } catch (error) {
        console.error('Error sending email:', error)
        formError.value = true
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          formError.value = false
        }, 5000)
      } finally {
        isSubmitting.value = false
      }
    }
    
    const toggleFaq = (id) => {
      openFaq.value = openFaq.value === id ? null : id
    }
    
    return {
      form,
      isSubmitting,
      formSubmitted,
      formError,
      submitForm,
      openFaq,
      toggleFaq
    }
  }
}
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>