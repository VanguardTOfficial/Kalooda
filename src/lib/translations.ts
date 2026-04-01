export type Locale = "en" | "ar";

export const translations = {
  en: {
    // Header & nav
    admin: "Admin",
    cart: "Cart",
    navMenu: "Menu",
    navOrderOnline: "Order online",
    navContact: "Contact",
    navOpenMenu: "Open menu",
    navCloseMenu: "Close menu",

    // Home hero
    heroTitle1: "Fresh Sweets,",
    heroTitle2: "Delivered Fast",
    heroSubtitle:
      "Hand-crafted chocolates, gummies, pastries & more. Order online and get same-day delivery.",
    heroBadge: "SweetDrop · Craft confections",
    heroCtaShop: "Explore the menu",
    heroCtaOrder: "Order for delivery",
    promoBanner:
      "Same-day delivery on many orders — place yours early for the best selection.",
    sectionFeaturedEyebrow: "Curated for you",
    sectionFeaturedTitle: "Selections from our kitchen",
    sectionFeaturedSubtitle:
      "Guest favorites and seasonal highlights, made in small batches.",
    sectionStoryKicker: "Our table",
    sectionStoryTitle: "Hospitality you can taste",
    sectionStoryBody:
      "We blend time-honored techniques with carefully sourced ingredients so every box feels like a gift — whether it is a quiet treat at home or something shared with people you love. From the first melt of chocolate to the last crumb of pastry, we aim for warmth, balance, and a little everyday luxury.",
    sectionStoryQuote:
      "Quality is never rushed — it is layered, tasted, and refined.",
    sectionOrderCtaTitle: "Ready when you are",
    sectionOrderCtaBody:
      "Review your cart, confirm your details, and we will prepare your order with the same care we would serve at our own table.",
    viewFullMenu: "View full menu",
    trustCraft: "Small-batch, hand-finished confections",
    trustDeliveryLine: "Same-day delivery where available",
    footerTagline:
      "Artisan confections and pastries, packed with care and brought to your door.",
    footerRights: "© 2026 SweetDrop. All rights reserved.",
    footerCrafted: "Made fresh. Delivered with intention.",
    footerExplore: "Explore",
    footerVisit: "Visit & account",
    footerDeliveryArea: "Daily delivery in our local service area",
    footerContact: "Guest services",
    loadingProducts: "Loading products...",
    searchPlaceholder: "Search sweets...",
    all: "All",
    noProducts: "No products found. Try a different search or category.",

    // Product card
    add: "Add",

    // Cart drawer
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyHint: "Add some sweet treats!",
    each: "each",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    signInToCheckout: "Sign in to checkout",
    orderRequiresSignIn:
      "Your session expired. Please sign in again to place your order.",

    // Chatbot
    chatbotGreeting:
      "Hi! I'm KaloodaBot 🍰 Ask me about our cheesecakes, ingredients, or allergies!",
    sweetBot: "KaloodaBot",
    chatbotSubtitle: "Ask about allergies & ingredients",
    chatbotPlaceholder: "Ask about allergies...",
    chatbotError: "Sorry, something went wrong.",
    chatbotOffline: "Unable to connect. Please try again.",
    typing: "Typing…",
    toggleChat: "Toggle chat",

    // Checkout
    orderPlaced: "Order Placed!",
    orderConfirmation:
      "is pending. Track status updates in My Orders.",
    yourOrder: "Your order",
    continueShopping: "Continue Shopping",
    backToShop: "Back to shop",
    checkout: "Checkout",
    cartEmptyCheckout: "Your cart is empty.",
    browseProducts: "Browse products",
    orderSummary: "Order Summary",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    phonePlaceholder: "+1234567890",
    placeOrder: "Place Order",
    placingOrder: "Placing Order...",
    orderFailed: "Failed to place order. Please try again.",
    orderSchemaOutdated:
      "The database needs updating: run Supabase migrations (add orders.user_id). See supabase/migrations/.",
    profileIncompleteCheckout:
      "Add your name and phone in the form or in your account to place an order.",
    deliveryContact: "Delivery contact",
    editInAccount: "Edit in account",
    checkoutProfileHint:
      "We will save these details to your profile for your next order.",

    // Account
    account: "Account",
    myProfile: "My profile",
    myOrders: "My Orders",
    saveProfile: "Save profile",
    profileSavedToast: "Profile saved.",
    profileSaveFailedToast: "Could not save profile.",
    orderHistoryTitle: "Order history",
    orderHistoryEmpty: "You have no orders yet.",
    viewOrderHistory: "View order history",

    // Admin
    adminDashboard: "Admin Dashboard",
    pending: "Pending",
    preparing: "Preparing",
    outForDelivery: "Out for delivery",
    order: "Order",
    customer: "Customer",
    items: "Items",
    status: "Status",
    actions: "Actions",
    noOrders: "No orders yet.",
    orders: "Orders",
    deleteOrder: "Delete",
    confirmDeleteOrder: "Are you sure you want to delete this order?",
    orderDeleteFailed: "Failed to delete order.",

    // Admin nav
    dashboard: "Dashboard",
    functions: "Functions",

    // Product availability (dashboard)
    productAvailability: "Product Availability",
    available: "Available",
    unavailableToday: "Unavailable Today",
    markUnavailable: "Mark Unavailable",
    markAvailable: "Mark Available",
    noProductsYet: "No products yet.",

    // Functions — Product management
    products: "Products",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete",
    saveProduct: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    productName: "Product Name",
    productNameAr: "Product Name (Arabic)",
    description: "Description",
    descriptionAr: "Description (Arabic)",
    ingredients: "Ingredients",
    ingredientsAr: "Ingredients (Arabic)",
    price: "Price",
    stockQuantity: "Stock",
    allergens: "Allergens",
    allergensPlaceholder: "Comma-separated (e.g. dairy, nuts)",
    imageUrl: "Image URL",
    category: "Category",
    selectCategory: "Select category",
    english: "English",
    arabic: "Arabic",
    confirmDeleteProduct: "Are you sure you want to delete this product?",
    productSaved: "Product saved successfully.",
    productSaveFailed: "Failed to save product.",
    productDeleted: "Product deleted.",
    productDeleteFailed: "Failed to delete product.",

    // Categories
    categories: "Categories",
    addCategory: "Add Category",
    categoryName: "Name",
    categoryNameAr: "Name (Arabic)",
    categoryNamePlaceholder: "Category name",
    categoryNameArPlaceholder: "اسم الفئة",
    removeCategory: "Remove",
    noCategories: "No categories yet.",
    categoryAddFailed: "Failed to add category.",
    confirmDeleteCategory: "Are you sure you want to remove this category? Products in this category will become uncategorized.",

    // Drivers
    drivers: "Drivers",
    driverName: "Name",
    driverPhone: "Phone",
    noDrivers: "No drivers yet.",
    addDriver: "Add Driver",
    adding: "Adding...",
    driverNamePlaceholder: "Driver name",
    driverPhonePlaceholder: "+1234567890",
    removeDriver: "Remove",
    driverAdded: "Driver added successfully.",
    driverAddFailed: "Failed to add driver.",

    // Delivery accept
    loadingOrder: "Loading order...",
    orderNotFound: "Order not found or already taken.",
    deliveryAccepted: "Delivery Accepted!",
    orderAssigned: "is now assigned to you.",
    newDelivery: "New Delivery",
    customerLabel: "Customer:",
    yourName: "Your Name",
    enterYourName: "Enter your name",
    acceptDelivery: "Accept Delivery",
    accepting: "Accepting...",

    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Your password",
    phonePlaceholder2: "+1234567890",
    createAccount: "Create Account",
    welcomeBack: "Welcome Back",
    signingIn: "Signing in...",
    signingUp: "Creating account...",
    signInError: "Invalid email or password. Please try again.",
    signUpError: "Could not create account. Please try again.",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    continueWithGoogle: "Continue with Google",
    or: "or",
    oauthError: "Something went wrong with sign in. Please try again.",
    confirmEmailMessage: "Account created! Please check your email and click the confirmation link before signing in.",
    authErrorTitle: "Account Problem",
    authErrorMessage: "There is a problem with your account. Please contact support for help.",
    contactSupport: "Contact Support",
    adminAccountUseAdminSignIn:
      "Staff accounts cannot use the shop sign-in. Use the admin sign-in page instead.",
    adminSignInTitle: "Admin sign in",
    adminSignInSubtitle: "Dashboard access for staff",
    adminSignInNoAccess: "This account does not have admin access.",
    adminSignInCustomerLink: "Customer shop sign in",

    // Language
    switchLanguage: "العربية",
  },
  ar: {
    // Header & nav
    admin: "لوحة التحكم",
    cart: "السلة",
    navMenu: "القائمة",
    navOrderOnline: "اطلب أونلاين",
    navContact: "تواصل",
    navOpenMenu: "فتح القائمة",
    navCloseMenu: "إغلاق القائمة",

    // Home hero
    heroTitle1: "حلويات طازجة،",
    heroTitle2: "توصيل سريع",
    heroSubtitle:
      "شوكولاتة يدوية الصنع، حلوى، معجنات والمزيد. اطلب أونلاين واحصل على توصيل في نفس اليوم.",
    heroBadge: "سويت دروب · حلويات حرفية",
    heroCtaShop: "استكشف القائمة",
    heroCtaOrder: "اطلب للتوصيل",
    promoBanner:
      "توصيل في نفس اليوم لعدة طلبات — اطلب مبكراً لأفضل توفر.",
    sectionFeaturedEyebrow: "مختارة لك",
    sectionFeaturedTitle: "مختارات من مطبخنا",
    sectionFeaturedSubtitle:
      "مفضلات الضيوف والموسمية، بكميات محدودة.",
    sectionStoryKicker: "طاولتنا",
    sectionStoryTitle: "ضيافة تُذاق",
    sectionStoryBody:
      "نمزج تقاليد راسخة مع مكونات مختارة بعناية ليكون كل صندوق كهدية — سواء كان لحظة هدوء في المنزل أو لقاء مع أحبائك. من أول ذوبان للشوكولاتة إلى آخر فتات المعجنات، نسعى للدفء والتوازن ولمسة من الفخامة اليومية.",
    sectionStoryQuote:
      "الجودة لا تُستعجل — تُبنى طبقةً طبقة وتُذاق وتُصقل.",
    sectionOrderCtaTitle: "نحن جاهزون عندما تكون أنت",
    sectionOrderCtaBody:
      "راجع سلتك، أكّد بياناتك، وسنحضّر طلبك بنفس العناية التي نقدّمها على طاولتنا.",
    viewFullMenu: "عرض القائمة كاملة",
    trustCraft: "حلويات يدوية بطُبَعات صغيرة",
    trustDeliveryLine: "توصيل في نفس اليوم حيث يتوفر",
    footerTagline:
      "حلويات ومعجنات حرفية، معبأة بعناية وتوصّل إلى بابك.",
    footerRights: "© 2026 سويت دروب. جميع الحقوق محفوظة.",
    footerCrafted: "طازجة الصنع. توصيل بعناية.",
    footerExplore: "استكشف",
    footerVisit: "الزيارة والحساب",
    footerDeliveryArea: "توصيل يومي ضمن منطقة خدمتنا",
    footerContact: "خدمة الضيوف",
    loadingProducts: "جارٍ تحميل المنتجات...",
    searchPlaceholder: "ابحث عن الحلويات...",
    all: "الكل",
    noProducts: "لم يتم العثور على منتجات. جرّب بحثاً أو فئة مختلفة.",

    // Product card
    add: "أضف",

    // Cart drawer
    yourCart: "سلة التسوق",
    cartEmpty: "سلتك فارغة",
    cartEmptyHint: "أضف بعض الحلويات اللذيذة!",
    each: "للقطعة",
    total: "المجموع",
    proceedToCheckout: "إتمام الشراء",
    signInToCheckout: "سجّل الدخول لإتمام الشراء",
    orderRequiresSignIn:
      "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى لإتمام الطلب.",

    // Chatbot
    chatbotGreeting:
      "مرحباً! أنا كالودا بوت 🍰 اسألني عن كيك الجبن أو المكونات أو الحساسية!",
    sweetBot: "كالودا بوت",
    chatbotSubtitle: "اسأل عن الحساسية والمكونات",
    chatbotPlaceholder: "اسأل عن الحساسية...",
    chatbotError: "عذراً، حدث خطأ ما.",
    chatbotOffline: "تعذر الاتصال. يرجى المحاولة مرة أخرى.",
    typing: "يكتب...",
    toggleChat: "فتح/إغلاق المحادثة",

    // Checkout
    orderPlaced: "تم تقديم الطلب!",
    orderConfirmation: "قيد الانتظار. تابع حالة الطلب من «طلباتي».",
    yourOrder: "طلبك",
    continueShopping: "متابعة التسوق",
    backToShop: "العودة للمتجر",
    checkout: "إتمام الطلب",
    cartEmptyCheckout: "سلتك فارغة.",
    browseProducts: "تصفح المنتجات",
    orderSummary: "ملخص الطلب",
    name: "الاسم",
    namePlaceholder: "اسمك",
    phone: "الهاتف",
    phonePlaceholder: "+1234567890",
    placeOrder: "تأكيد الطلب",
    placingOrder: "جارٍ تأكيد الطلب...",
    orderFailed: "فشل تقديم الطلب. يرجى المحاولة مرة أخرى.",
    orderSchemaOutdated:
      "قاعدة البيانات تحتاج تحديثاً: شغّل ترحيلات Supabase (إضافة orders.user_id). راجع مجلد supabase/migrations/.",
    profileIncompleteCheckout:
      "أضف اسمك ورقم هاتفك في النموذج أو في حسابك لإتمام الطلب.",
    deliveryContact: "بيانات التوصيل",
    editInAccount: "تعديل من الحساب",
    checkoutProfileHint:
      "سنحفظ هذه البيانات في ملفك للطلبات القادمة.",

    // Account
    account: "الحساب",
    myProfile: "ملفي الشخصي",
    myOrders: "طلباتي",
    saveProfile: "حفظ الملف الشخصي",
    profileSavedToast: "تم حفظ الملف الشخصي.",
    profileSaveFailedToast: "تعذر حفظ الملف الشخصي.",
    orderHistoryTitle: "سجل الطلبات",
    orderHistoryEmpty: "لا توجد طلبات بعد.",
    viewOrderHistory: "عرض سجل الطلبات",

    // Admin
    adminDashboard: "لوحة التحكم",
    pending: "قيد الانتظار",
    preparing: "قيد التحضير",
    outForDelivery: "في الطريق للتوصيل",
    order: "الطلب",
    customer: "العميل",
    items: "المنتجات",
    status: "الحالة",
    actions: "الإجراءات",
    noOrders: "لا توجد طلبات بعد.",
    orders: "الطلبات",
    deleteOrder: "حذف",
    confirmDeleteOrder: "هل أنت متأكد من حذف هذا الطلب؟",
    orderDeleteFailed: "فشل في حذف الطلب.",

    // Admin nav
    dashboard: "لوحة القيادة",
    functions: "الوظائف",

    // Product availability (dashboard)
    productAvailability: "توفر المنتجات",
    available: "متوفر",
    unavailableToday: "غير متوفر اليوم",
    markUnavailable: "تعليق المنتج",
    markAvailable: "إتاحة المنتج",
    noProductsYet: "لا توجد منتجات بعد.",

    // Functions — Product management
    products: "المنتجات",
    addProduct: "إضافة منتج",
    editProduct: "تعديل المنتج",
    deleteProduct: "حذف",
    saveProduct: "حفظ",
    saving: "جارٍ الحفظ...",
    cancel: "إلغاء",
    productName: "اسم المنتج",
    productNameAr: "اسم المنتج (عربي)",
    description: "الوصف",
    descriptionAr: "الوصف (عربي)",
    ingredients: "المكونات",
    ingredientsAr: "المكونات (عربي)",
    price: "السعر",
    stockQuantity: "المخزون",
    allergens: "مسببات الحساسية",
    allergensPlaceholder: "مفصولة بفواصل (مثل: ألبان، مكسرات)",
    imageUrl: "رابط الصورة",
    category: "الفئة",
    selectCategory: "اختر فئة",
    english: "الإنجليزية",
    arabic: "العربية",
    confirmDeleteProduct: "هل أنت متأكد من حذف هذا المنتج؟",
    productSaved: "تم حفظ المنتج بنجاح.",
    productSaveFailed: "فشل في حفظ المنتج.",
    productDeleted: "تم حذف المنتج.",
    productDeleteFailed: "فشل في حذف المنتج.",

    // Categories
    categories: "الفئات",
    addCategory: "إضافة فئة",
    categoryName: "الاسم",
    categoryNameAr: "الاسم (عربي)",
    categoryNamePlaceholder: "اسم الفئة",
    categoryNameArPlaceholder: "اسم الفئة",
    removeCategory: "إزالة",
    noCategories: "لا توجد فئات بعد.",
    categoryAddFailed: "فشل في إضافة الفئة.",
    confirmDeleteCategory: "هل أنت متأكد من إزالة هذه الفئة؟ ستصبح المنتجات في هذه الفئة بدون تصنيف.",

    // Drivers
    drivers: "السائقون",
    driverName: "الاسم",
    driverPhone: "رقم الهاتف",
    noDrivers: "لا يوجد سائقون بعد.",
    addDriver: "إضافة سائق",
    adding: "جارٍ الإضافة...",
    driverNamePlaceholder: "اسم السائق",
    driverPhonePlaceholder: "+1234567890",
    removeDriver: "إزالة",
    driverAdded: "تمت إضافة السائق بنجاح.",
    driverAddFailed: "فشل في إضافة السائق.",

    // Delivery accept
    loadingOrder: "جارٍ تحميل الطلب...",
    orderNotFound: "الطلب غير موجود أو تم قبوله بالفعل.",
    deliveryAccepted: "تم قبول التوصيل!",
    orderAssigned: "تم تعيينه لك الآن.",
    newDelivery: "توصيل جديد",
    customerLabel: "العميل:",
    yourName: "اسمك",
    enterYourName: "أدخل اسمك",
    acceptDelivery: "قبول التوصيل",
    accepting: "جارٍ القبول...",

    // Auth
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "كلمة المرور",
    phonePlaceholder2: "+1234567890",
    createAccount: "إنشاء حساب",
    welcomeBack: "مرحباً بعودتك",
    signingIn: "جارٍ تسجيل الدخول...",
    signingUp: "جارٍ إنشاء الحساب...",
    signInError: "بريد إلكتروني أو كلمة مرور غير صحيحة. حاول مرة أخرى.",
    signUpError: "تعذر إنشاء الحساب. حاول مرة أخرى.",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    dontHaveAccount: "ليس لديك حساب؟",
    continueWithGoogle: "المتابعة مع جوجل",
    or: "أو",
    oauthError: "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.",
    confirmEmailMessage: "تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني والنقر على رابط التأكيد قبل تسجيل الدخول.",
    authErrorTitle: "مشكلة في الحساب",
    authErrorMessage: "هناك مشكلة في حسابك. يرجى التواصل مع الدعم للمساعدة.",
    contactSupport: "التواصل مع الدعم",
    adminAccountUseAdminSignIn:
      "لا يمكن لحسابات الموظفين استخدام تسجيل دخول المتجر. استخدم صفحة تسجيل دخول الإدارة.",
    adminSignInTitle: "تسجيل دخول الإدارة",
    adminSignInSubtitle: "الوصول إلى لوحة التحكم للموظفين",
    adminSignInNoAccess: "هذا الحساب ليس لديه صلاحية الإدارة.",
    adminSignInCustomerLink: "تسجيل دخول متجر العملاء",

    // Language
    switchLanguage: "English",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
