$(document).ready(function() {

            // =========================
            // تعريف التطبيقات الافتراضية
            // =========================
            const defaultApps = [{
                appName: "ChatGPT",
                company: "OpenAI",
                category: "AI Assistant",
                isFree: "مجاني",
                description: "مساعد ذكي يعتمد على الذكاء الاصطناعي لتوليد النصوص والمحادثات.",
                website: "https://chat.openai.com",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
                video: "https://www.youtube.com/embed/mjyo38u-N74",
                audio: ""
            }];

            // في حال لم يكن هناك بيانات مخزنة سابقاً في LocalStorage
            // يتم تخزين التطبيقات الافتراضية
            if (!localStorage.getItem("apps")) {
                localStorage.setItem("apps", JSON.stringify(defaultApps));
            }

            // =========================
            // دالة تحميل التطبيقات في الجدول
            // =========================
            function loadApps() {
                const tableBody = $("#appsTable tbody");
                tableBody.empty(); // مسح أي محتوى قديم بالجدول

                const apps = JSON.parse(localStorage.getItem("apps")); // جلب التطبيقات من LocalStorage

                // إنشاء صفوف الجدول لكل تطبيق
                apps.forEach((app, index) => {
                            const row = $(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${app.appName}</td>
                    <td>${app.company}</td>
                    <td>${app.category}</td>
                    <td>${app.isFree}</td>
                    <td><button class="details-btn">عرض</button></td>
                </tr>
                <tr class="hidden">
                    <td colspan="6">
                        <div class="details-container">
                            ${app.logo ? `<img src="${app.logo}" class="app-logo" alt="${app.appName} logo">` : ""}
                            <p><strong>الوصف:</strong> ${app.description}</p>
                            ${app.video ? `<div class="video-wrapper"><iframe src="${app.video}" frameborder="0" allowfullscreen></iframe></div>` : ""}
                            <p><a href="${app.website}" target="_blank" class="visit-link">🌐 زيارة الموقع</a></p>
                        </div>
                    </td>
                </tr>
            `);
            tableBody.append(row); // إضافة الصف للجدول
        });

        // =========================
        // زر التفاصيل لإظهار / إخفاء تفاصيل التطبيق
        // =========================
        $(".details-btn").off("click").on("click", function () {
            const detailsRow = $(this).closest("tr").next(); // الصف التالي يحوي التفاصيل
            detailsRow.toggleClass("hidden"); // إظهار/إخفاء الصف
            $(this).text(detailsRow.hasClass("hidden") ? "عرض" : "إخفاء"); // تغيير النص حسب الحالة
        });
    }

    // =========================
    // معالجة إضافة تطبيق جديد من خلال النموذج
    // =========================
    if ($("#appForm").length) {
        $("#appForm").on("submit", function (e) {
            e.preventDefault(); // منع تحديث الصفحة عند الإرسال

            // جلب القيم المدخلة من الحقول
            const appName = $("#appName").val().trim();
            const company = $("#company").val().trim();
            const website = $("#website").val().trim();
            const isFree = $("#isFree").val();
            const category = $("#category").val();
            const description = $("#description").val().trim();
            const logo = $("#logo").val().trim();
            const video = $("#video").val().trim();
            const audio = $("#audio").val().trim();

            // التحقق من صحة البيانات باستخدام تعابير نمطية
            const nameRegex = /^[A-Za-z]+$/;
            const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

            if (!nameRegex.test(appName)) {
                alert("اسم التطبيق يجب أن يكون إنكليزي بدون فراغات.");
                return;
            }
            if (!nameRegex.test(company)) {
                alert("اسم الشركة يجب أن يكون إنكليزي فقط.");
                return;
            }
            if (!urlRegex.test(website)) {
                alert("ادخل رابط موقع صحيح.");
                return;
            }
            if (description.length < 5) {
                alert("الوصف يجب أن يكون على الأقل 5 أحرف.");
                return;
            }

            // جلب التطبيقات السابقة من LocalStorage أو إنشاء مصفوفة جديدة
            const apps = JSON.parse(localStorage.getItem("apps")) || [];

            // إضافة التطبيق الجديد
            apps.push({ appName, company, category, isFree, description, website, logo, video, audio });

            // إعادة حفظ البيانات في LocalStorage
            localStorage.setItem("apps", JSON.stringify(apps));

            // الانتقال لصفحة عرض التطبيقات بعد الإضافة
            window.location.href = "apps.html";
        });
    }

    // =========================
    // تحميل التطبيقات تلقائياً إذا كان جدول التطبيقات موجود بالصفحة
    // =========================
    if ($("#appsTable").length) {
        loadApps();
    }

});