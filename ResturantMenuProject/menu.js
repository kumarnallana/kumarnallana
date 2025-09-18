// ===== RESTAURANT MENU JAVASCRIPT =====
// Modern ES6+ Dark mode toggle, form interactions, and mobile navigation

class RestaurantMenuManager {
  constructor() {
    this.notifications = new Set();
    this.passwordStrengthConfig = {
      minLength: 8,
      maxLength: 128,
      requirements: {
        length: { weight: 20, message: "At least 8 characters" },
        lowercase: { weight: 15, message: "One lowercase letter (a-z)" },
        uppercase: { weight: 15, message: "One uppercase letter (A-Z)" },
        number: { weight: 15, message: "One number (0-9)" },
        special: { weight: 15, message: "One special character (!@#$%^&*)" },
        complexity: { weight: 20, message: "Avoid common patterns" },
      },
    };
    this.init();
  }

  async init() {
    await this.setupDarkMode();
    await this.setupMobileNavigation();
    await this.setupPasswordChecker();
    await this.setupFavoriteFoodDropdown();
    await this.setupFormInteractions();
    await this.setupUtilities();
    await this.setupAnimations();
    await this.setupAccessibility();
    await this.setupFormEnhancements();
    this.showWelcomeMessage();
  }

  // ===== DARK MODE FUNCTIONALITY =====
  async setupDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check for saved dark mode preference with system preference fallback
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Enhanced dark mode toggle with animation
    darkModeToggle?.addEventListener("change", (e) => {
      const isDark = e.target.checked;
      body.style.transition = "all 0.3s ease";

      if (isDark) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        this.showNotification("Dark mode enabled! 🌙", "info");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        this.showNotification("Light mode enabled! ☀️", "info");
      }
    });

    // Listen for system theme changes
    window
      .matchMedia?.("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          body.classList.toggle("dark-mode", e.matches);
          if (darkModeToggle) darkModeToggle.checked = e.matches;
        }
      });
  }

  // ===== MOBILE NAVIGATION =====
  async setupMobileNavigation() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!mobileMenuBtn || !mobileMenu) return;

    // Enhanced mobile menu toggle with better animations
    mobileMenuBtn.addEventListener("click", () => {
      const isMenuVisible = mobileMenu.classList.contains("show");

      mobileMenu.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

      if (!isMenuVisible) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("show");
        mobileMenuBtn.textContent = "✕";
        mobileMenuBtn.setAttribute("aria-label", "Close menu");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("show");
        mobileMenuBtn.textContent = "☰";
        mobileMenuBtn.setAttribute("aria-label", "Open menu");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () =>
        this.closeMobileMenu(mobileMenu, mobileMenuBtn)
      );
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = mobileMenuBtn.contains(event.target);

      if (
        !isClickInsideMenu &&
        !isClickOnButton &&
        mobileMenu.classList.contains("show")
      ) {
        this.closeMobileMenu(mobileMenu, mobileMenuBtn);
      }
    });
  }

  closeMobileMenu = (mobileMenu, mobileMenuBtn) => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("show");
    mobileMenuBtn.textContent = "☰";
    mobileMenuBtn.setAttribute("aria-label", "Open menu");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  // ===== ENHANCED PASSWORD STRENGTH CHECKER =====
  async setupPasswordChecker() {
    const passwordInput = document.getElementById("pwd");
    if (!passwordInput) return;

    const passwordStrengthContainer = this.createPasswordStrengthChecker();
    passwordInput.parentNode.insertBefore(
      passwordStrengthContainer,
      passwordInput.nextSibling
    );

    // Enhanced password validation with debouncing
    let validationTimeout;
    passwordInput.addEventListener("input", (e) => {
      clearTimeout(validationTimeout);
      validationTimeout = setTimeout(() => {
        this.validatePasswordStrength(
          e.target.value,
          passwordStrengthContainer
        );
      }, 300);
    });

    passwordInput.addEventListener("focus", () => {
      passwordStrengthContainer.style.opacity = "1";
      passwordStrengthContainer.style.transform = "translateY(0)";
    });

    passwordInput.addEventListener("blur", () => {
      if (!passwordInput.value) {
        passwordStrengthContainer.style.opacity = "0";
        passwordStrengthContainer.style.transform = "translateY(-10px)";
      }
    });
  }

  createPasswordStrengthChecker() {
    const container = document.createElement("div");
    container.id = "password-strength-advanced";
    container.style.cssText = `
      margin-top: 12px;
      padding: 16px;
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.07) 100%);
      border: 1px solid #e0e0e0;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 12px;
      line-height: 1.5;
      backdrop-filter: blur(10px);
    `;

    // Strength indicator with gradient
    const strengthIndicator = document.createElement("div");
    strengthIndicator.style.cssText = `
      height: 6px;
      background: linear-gradient(90deg, #e0e0e0 0%, #e0e0e0 100%);
      border-radius: 3px;
      margin-bottom: 12px;
      overflow: hidden;
      position: relative;
    `;

    const strengthBar = document.createElement("div");
    strengthBar.style.cssText = `
      height: 100%;
      width: 0%;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 3px;
      position: relative;
      overflow: hidden;
    `;

    // Add shimmer effect
    const shimmer = document.createElement("div");
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    `;

    // Strength text display
    const strengthText = document.createElement("div");
    strengthText.style.cssText = `
      font-weight: bold;
      margin-bottom: 8px;
      font-size: 13px;
      transition: color 0.3s ease;
    `;

    // Password requirements checklist
    const requirementsList = document.createElement("div");
    requirementsList.innerHTML = `
      <div class="password-rule" data-rule="length">○ ${this.passwordStrengthConfig.requirements.length.message}</div>
      <div class="password-rule" data-rule="lowercase">○ ${this.passwordStrengthConfig.requirements.lowercase.message}</div>
      <div class="password-rule" data-rule="uppercase">○ ${this.passwordStrengthConfig.requirements.uppercase.message}</div>
      <div class="password-rule" data-rule="number">○ ${this.passwordStrengthConfig.requirements.number.message}</div>
      <div class="password-rule" data-rule="special">○ ${this.passwordStrengthConfig.requirements.special.message}</div>
      <div class="password-rule" data-rule="complexity">○ ${this.passwordStrengthConfig.requirements.complexity.message}</div>
    `;

    // Password suggestions
    const suggestions = document.createElement("div");
    suggestions.className = "password-suggestions";
    suggestions.style.cssText = `
      margin-top: 12px;
      padding: 8px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 4px;
      font-size: 11px;
      color: #667eea;
      display: none;
    `;

    strengthBar.appendChild(shimmer);
    strengthIndicator.appendChild(strengthBar);
    container.appendChild(strengthIndicator);
    container.appendChild(strengthText);
    container.appendChild(requirementsList);
    container.appendChild(suggestions);

    // Add shimmer animation keyframes
    this.addAnimationStyles();

    return container;
  }

  validatePasswordStrength(password, container) {
    const { requirements } = this.passwordStrengthConfig;
    let totalScore = 0;
    let maxScore = 100;
    const results = {};

    // Length check with progressive scoring
    const lengthScore = Math.min(
      (password.length / 12) * requirements.length.weight,
      requirements.length.weight
    );
    results.length = password.length >= 8;
    totalScore += lengthScore;

    // Character type checks
    results.lowercase = /[a-z]/.test(password);
    if (results.lowercase) totalScore += requirements.lowercase.weight;

    results.uppercase = /[A-Z]/.test(password);
    if (results.uppercase) totalScore += requirements.uppercase.weight;

    results.number = /[0-9]/.test(password);
    if (results.number) totalScore += requirements.number.weight;

    results.special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (results.special) totalScore += requirements.special.weight;

    // Advanced complexity check
    const complexityScore = this.calculateComplexity(password);
    results.complexity = complexityScore > 0.7;
    totalScore += complexityScore * requirements.complexity.weight;

    this.updatePasswordDisplay(container, results, totalScore, password);
  }

  calculateComplexity(password) {
    let complexity = 0;
    const commonPatterns = [
      /123/,
      /abc/,
      /qwerty/,
      /password/,
      /admin/,
      /user/,
    ];
    const hasRepeats = /(.)\1{2,}/.test(password);
    const hasSequential =
      /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
        password
      );

    // Penalty for common patterns
    if (
      commonPatterns.some((pattern) => pattern.test(password.toLowerCase()))
    ) {
      complexity -= 0.3;
    }

    // Penalty for repeating characters
    if (hasRepeats) complexity -= 0.2;

    // Penalty for sequential characters
    if (hasSequential) complexity -= 0.2;

    // Bonus for mixed case and numbers
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) complexity += 0.2;
    if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) complexity += 0.2;

    // Length bonus
    if (password.length >= 12) complexity += 0.3;
    if (password.length >= 16) complexity += 0.2;

    return Math.max(0, Math.min(1, complexity + 0.7));
  }

  updatePasswordDisplay(container, results, score, password) {
    const strengthBar = container.querySelector("div > div");
    const strengthText = container.children[1];
    const suggestions = container.querySelector(".password-suggestions");
    const rules = container.querySelectorAll(".password-rule");

    // Update progress bar
    const percentage = Math.min(score, 100);
    strengthBar.style.width = `${percentage}%`;

    // Dynamic color based on strength
    let color, bgColor, textColor, strength;
    if (score < 30) {
      color = "#ff4757";
      bgColor = "linear-gradient(90deg, #ff4757, #ff6b6b)";
      textColor = "#ff4757";
      strength = "Very Weak";
    } else if (score < 50) {
      color = "#ffa502";
      bgColor = "linear-gradient(90deg, #ffa502, #ff9f43)";
      textColor = "#ffa502";
      strength = "Weak";
    } else if (score < 70) {
      color = "#ff6348";
      bgColor = "linear-gradient(90deg, #ff6348, #ff7675)";
      textColor = "#ff6348";
      strength = "Fair";
    } else if (score < 85) {
      color = "#1dd1a1";
      bgColor = "linear-gradient(90deg, #1dd1a1, #00d2d3)";
      textColor = "#1dd1a1";
      strength = "Good";
    } else {
      color = "#2ed573";
      bgColor = "linear-gradient(90deg, #2ed573, #1dd1a1)";
      textColor = "#2ed573";
      strength = "Excellent";
    }

    strengthBar.style.background = bgColor;
    strengthText.style.color = textColor;
    strengthText.textContent = `Password Strength: ${strength} (${Math.round(
      percentage
    )}%)`;

    // Update rule indicators with smooth animations
    rules.forEach((rule) => {
      const ruleType = rule.dataset.rule;
      const isValid = results[ruleType];

      rule.style.transition = "all 0.3s ease";
      if (isValid) {
        rule.style.color = "#2ed573";
        rule.innerHTML = rule.innerHTML.replace("○", "✓");
      } else {
        rule.style.color = "#666";
        rule.innerHTML = rule.innerHTML.replace("✓", "○");
      }
    });

    // Show suggestions for weak passwords
    if (score < 70) {
      suggestions.style.display = "block";
      suggestions.innerHTML = this.getPasswordSuggestions(password, results);
    } else {
      suggestions.style.display = "none";
    }
  }

  getPasswordSuggestions(password, results) {
    const suggestions = [];

    if (password.length < 8) {
      suggestions.push("• Make it longer (at least 8 characters)");
    }
    if (!results.uppercase) {
      suggestions.push("• Add uppercase letters (A-Z)");
    }
    if (!results.lowercase) {
      suggestions.push("• Add lowercase letters (a-z)");
    }
    if (!results.number) {
      suggestions.push("• Include numbers (0-9)");
    }
    if (!results.special) {
      suggestions.push("• Add special characters (!@#$%^&*)");
    }
    if (!results.complexity) {
      suggestions.push("• Avoid common patterns and repetitive characters");
    }

    return suggestions.length > 0
      ? `<strong>💡 Suggestions:</strong><br>${suggestions.join("<br>")}`
      : "🎉 Great password!";
  }

  // ===== ENHANCED FAVOURITE FOOD DROPDOWN =====
  async setupFavoriteFoodDropdown() {
    const preferenceForms = document.querySelectorAll(
      'form[action="/action_page.php"]'
    );

    const foodOptions = [
      { value: "", text: "Select your favourite...", emoji: "" },
      { value: "biryani", text: "Chicken Biryani", emoji: "🍚" },
      { value: "friedfish", text: "Fried Fish", emoji: "🐟" },
      { value: "muttoncurry", text: "Mutton Curry", emoji: "🍛" },
      { value: "chickenroast", text: "Chicken Roast", emoji: "🍗" },
      { value: "prawns", text: "Prawns Masala", emoji: "🦐" },
      { value: "fishcurry", text: "Fish Curry", emoji: "🐠" },
      { value: "chickentikka", text: "Chicken Tikka", emoji: "🔥" },
      { value: "kebabs", text: "Kebabs", emoji: "🥩" },
      { value: "muttonbiryani", text: "Mutton Biryani", emoji: "🍛" },
      { value: "fishfry", text: "Fish Fry", emoji: "🐟" },
    ];

    preferenceForms.forEach((form) => {
      if (!form.querySelector("#favFood")) {
        const favFoodDiv = this.createEnhancedDropdown(foodOptions);
        const submitBtn = form.querySelector('input[type="submit"]');
        form.insertBefore(favFoodDiv, submitBtn);

        // Animate in with stagger effect
        setTimeout(() => {
          favFoodDiv.style.opacity = "1";
          favFoodDiv.style.transform = "translateY(0) scale(1)";
        }, 100);
      }
    });
  }

  createEnhancedDropdown(options) {
    const container = document.createElement("div");
    container.style.cssText = `
      margin: 15px 0;
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    const label = document.createElement("label");
    label.setAttribute("for", "favFood");
    label.style.cssText = `
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    `;
    label.textContent = "🍽️ Favourite Food:";

    const selectWrapper = document.createElement("div");
    selectWrapper.style.cssText = `
      position: relative;
      display: inline-block;
      width: 100%;
    `;

    const select = document.createElement("select");
    select.id = "favFood";
    select.name = "favFood";
    select.style.cssText = `
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      background: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      appearance: none;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%23666" d="M6 8L2 4h8z"/></svg>');
      background-repeat: no-repeat;
      background-position: right 12px center;
    `;

    // Add options
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.emoji
        ? `${option.emoji} ${option.text}`
        : option.text;
      select.appendChild(optionElement);
    });

    // Enhanced event listeners
    select.addEventListener("focus", () => {
      select.style.borderColor = "#667eea";
      select.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
      select.style.transform = "translateY(-1px)";
    });

    select.addEventListener("blur", () => {
      select.style.borderColor = "#ddd";
      select.style.boxShadow = "none";
      select.style.transform = "translateY(0)";
    });

    select.addEventListener("change", (e) => {
      if (e.target.value) {
        const selectedOption = options.find(
          (opt) => opt.value === e.target.value
        );
        const message = `Great choice! ${selectedOption.emoji} ${selectedOption.text}`;
        this.showSubtleNotification(message, "success");

        // Add celebration animation
        select.style.animation = "pulse 0.6s ease-in-out";
        setTimeout(() => {
          select.style.animation = "";
        }, 600);
      }
    });

    selectWrapper.appendChild(select);
    container.appendChild(label);
    container.appendChild(selectWrapper);

    return container;
  }

  // ===== ENHANCED FORM INTERACTIONS =====
  async setupFormInteractions() {
    await this.setupLoginForm();
    await this.setupOrderForms();
    await this.setupReviewForm();
    await this.setupPreferenceForms();
  }

  async setupLoginForm() {
    const loginForm = document.querySelector(".login form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const { username, pwd: password, dob } = Object.fromEntries(formData);

      // Enhanced validation with better error messages
      const validationResults = await this.validateLoginForm({
        username: username?.trim(),
        password: password?.trim(),
        dob,
      });

      if (!validationResults.isValid) {
        this.showAlert(validationResults.message, "error");
        return;
      }

      this.showAlert(`🎉 Welcome ${username}! Login successful!`, "success");

      // Simulate async login process
      setTimeout(() => {
        this.showNotification(
          "Redirecting to your personalized menu... 🍽️",
          "info"
        );
      }, 1500);
    });
  }

  async validateLoginForm({ username, password, dob }) {
    if (!username || !password || !dob) {
      return {
        isValid: false,
        message: "Please fill in all fields to login! 📝",
      };
    }

    if (username.length < 3) {
      return {
        isValid: false,
        message: "Username must be at least 3 characters long! 👤",
      };
    }

    const passwordStrength = this.calculatePasswordStrength(password);
    if (passwordStrength < 60) {
      return {
        isValid: false,
        message:
          "Please create a stronger password that meets security requirements! 🔐\nYour password strength is too low for secure login.",
      };
    }

    return { isValid: true };
  }

  calculatePasswordStrength(password) {
    const { requirements } = this.passwordStrengthConfig;
    let score = 0;

    if (password.length >= 8) score += requirements.length.weight;
    if (/[a-z]/.test(password)) score += requirements.lowercase.weight;
    if (/[A-Z]/.test(password)) score += requirements.uppercase.weight;
    if (/[0-9]/.test(password)) score += requirements.number.weight;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
      score += requirements.special.weight;

    const complexityScore = this.calculateComplexity(password);
    score += complexityScore * requirements.complexity.weight;

    return score;
  }

  async setupOrderForms() {
    const starterForms = document.querySelectorAll(".change");

    starterForms.forEach((form) => {
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach((checkbox) => {
        // Enhanced checkbox interactions
        checkbox.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        checkbox.addEventListener("change", (e) =>
          this.handleCheckboxChange(e, form)
        );
      });

      form.addEventListener("submit", (e) => this.handleOrderSubmit(e, form));
    });
  }

  handleCheckboxChange = (e, form) => {
    const checkbox = e.target;
    const label = form.querySelector(`label[for="${checkbox.id}"]`);
    const itemName = label
      ? label.textContent.replace(":", "").trim()
      : checkbox.name;

    if (checkbox.checked) {
      this.showSubtleNotification(`✅ Added: ${itemName}`, "success");
      // Enhanced visual feedback
      checkbox.style.transform = "scale(1.15)";
      setTimeout(() => {
        checkbox.style.transform = "scale(1)";
      }, 200);
    } else {
      this.showSubtleNotification(`❌ Removed: ${itemName}`, "info");
    }
  };

  handleOrderSubmit = (e, form) => {
    e.preventDefault();

    const checkedBoxes = form.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const selectedItems = Array.from(checkedBoxes).map((cb) => {
      const label = form.querySelector(`label[for="${cb.id}"]`);
      return label ? label.textContent.replace(":", "").trim() : cb.name;
    });

    if (selectedItems.length === 0) {
      this.showAlert(
        "Please select at least one item before submitting! 🍗",
        "error"
      );
      return;
    }

    const category = this.getCategoryFromForm(form);
    const orderSummary = `🎉 Thank you for your ${category} order!

📋 Selected items:
${selectedItems.map((item) => `• ${item}`).join("\n")}

👨‍🍳 Your delicious order will be prepared shortly!`;

    this.showAlert(orderSummary, "success");

    // Enhanced cleanup with animation
    setTimeout(() => {
      checkedBoxes.forEach((cb, index) => {
        setTimeout(() => {
          cb.checked = false;
          cb.style.transform = "scale(0.8)";
          setTimeout(() => {
            cb.style.transform = "scale(1)";
          }, 150);
        }, index * 100);
      });
      this.showNotification("Order submitted successfully! 📋", "success");
    }, 2000);
  };

  async setupReviewForm() {
    const reviewTextarea = document.querySelector('textarea[name="review"]');
    const reviewSubmitBtn = document.querySelector(
      'input[value="your love submit here"]'
    );

    if (reviewTextarea) {
      const feedbackDiv = this.createReviewFeedback();
      reviewTextarea.parentNode.insertBefore(
        feedbackDiv,
        reviewTextarea.nextSibling
      );

      let feedbackTimeout;
      reviewTextarea.addEventListener("input", (e) => {
        clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(() => {
          this.updateReviewFeedback(e.target, feedbackDiv);
        }, 200);
      });

      reviewTextarea.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    }

    reviewSubmitBtn?.addEventListener("click", (e) =>
      this.handleReviewSubmit(e, reviewTextarea)
    );
  }

  createReviewFeedback() {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "review-feedback";
    feedbackDiv.style.cssText = `
      margin-top: 8px;
      padding: 12px;
      border-radius: 6px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border: 1px solid rgba(102, 126, 234, 0.2);
      font-size: 12px;
      transition: all 0.3s ease;
    `;
    return feedbackDiv;
  }

  updateReviewFeedback(textarea, feedbackDiv) {
    const length = textarea.value.trim().length;
    const maxLength = 500;
    let message = "";
    let color = "#666";

    if (length === 0) {
      message = "💭 Share your experience with us...";
      color = "#999";
    } else if (length < 10) {
      message = `📝 Keep writing... ${
        10 - length
      } more characters needed for a meaningful review`;
      color = "#ff6b6b";
    } else if (length >= 10 && length <= 50) {
      message = `👍 Good start! ${length}/500 characters. Consider adding more details about your experience.`;
      color = "#feca57";
      setTimeout(() => {
        this.showSubtleNotification(
          "Great start! Keep sharing your thoughts 💭",
          "info"
        );
      }, 1000);
    } else if (length > 50 && length <= 150) {
      message = `🌟 Excellent review! ${length}/500 characters. Your feedback is valuable!`;
      color = "#48dbfb";
    } else {
      message = `🎉 Comprehensive review! ${length}/500 characters. Thank you for the detailed feedback!`;
      color = "#2ed573";
    }

    feedbackDiv.innerHTML = message;
    feedbackDiv.style.color = color;
    feedbackDiv.style.borderColor = `${color}40`;

    // Visual feedback for the textarea
    if (length >= 10) {
      textarea.style.borderColor = "#2ed573";
      textarea.style.boxShadow = "0 0 0 2px rgba(46, 213, 115, 0.1)";
    } else {
      textarea.style.borderColor = "#ddd";
      textarea.style.boxShadow = "none";
    }
  }

  handleReviewSubmit = (e, reviewTextarea) => {
    e.preventDefault();

    const reviewText = reviewTextarea?.value.trim() || "";

    if (!reviewText) {
      this.showAlert("Please share your valuable review with us! 💭", "error");
      return;
    }

    if (reviewText.length < 10) {
      this.showAlert(
        "Please write a more detailed review (at least 10 characters) 📝",
        "error"
      );
      return;
    }

    const reviewSummary = `🌟 Thank you for your amazing review!

"${reviewText}"

🙏 Your feedback helps us serve better food!
⭐ Review length: ${reviewText.length} characters`;

    this.showAlert(reviewSummary, "success");

    if (reviewTextarea) {
      setTimeout(() => {
        reviewTextarea.value = "";
        reviewTextarea.style.borderColor = "#ddd";
        reviewTextarea.style.boxShadow = "none";
        const feedbackDiv = reviewTextarea.nextSibling;
        if (feedbackDiv) {
          feedbackDiv.innerHTML = "💭 Share your experience with us...";
          feedbackDiv.style.color = "#999";
        }
        this.showNotification(
          "Review submitted! We truly appreciate your feedback! 💝",
          "success"
        );
      }, 2000);
    }
  };

  async setupPreferenceForms() {
    const preferenceSubmits = document.querySelectorAll(
      'form[action="/action_page.php"] input[type="submit"]'
    );

    preferenceSubmits.forEach((submit) => {
      submit.addEventListener("click", (e) => this.handlePreferenceSubmit(e));
    });
  }

  handlePreferenceSubmit = (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    const selects = form.querySelectorAll("select");
    const preferences = {};

    selects.forEach((select) => {
      const label = form.querySelector(
        `label[for="${select.id}"], label[for="${select.name}"]`
      );
      const labelText = label
        ? label.textContent.replace(":", "").trim()
        : select.name;
      if (select.value) {
        preferences[labelText] = select.options[select.selectedIndex].text;
      }
    });

    if (Object.keys(preferences).length === 0) {
      this.showAlert("Please make at least one selection! 🎯", "error");
      return;
    }

    const prefText = Object.entries(preferences)
      .map(([key, value]) => `• ${key}: ${value}`)
      .join("\n");

    const preferenceMessage = `🎯 Thank you for sharing your preferences!

${prefText}

🌟 We'll use this to recommend the perfect dishes for you!`;

    this.showAlert(preferenceMessage, "success");
  };

  // ===== ENHANCED UTILITY FUNCTIONS =====
  async setupUtilities() {
    this.setupSmoothScrolling();
    this.setupScrollAnimations();
  }

  getCategoryFromForm(form) {
    const prevUl = form.previousElementSibling;
    if (prevUl?.tagName === "UL") {
      const li = prevUl.querySelector("li");
      if (li) return li.textContent.toLowerCase();
    }
    return "menu item";
  }

  setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(
      'div[class*="container"], .chicken'
    );
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // ===== ENHANCED NOTIFICATION SYSTEM =====
  showSubtleNotification(message, type = "info") {
    // Prevent notification spam
    if (this.notifications.has(message)) return;
    this.notifications.add(message);

    const notification = document.createElement("div");
    notification.className = `subtle-notification ${type}`;
    notification.textContent = message;

    const colors = {
      info: "rgba(102, 126, 234, 0.9)",
      success: "rgba(46, 213, 115, 0.9)",
      error: "rgba(255, 71, 87, 0.9)",
      warning: "rgba(255, 165, 2, 0.9)",
    };

    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 10px 16px;
      border-radius: 25px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 9998;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 12px;
      font-weight: 500;
      max-width: 280px;
      opacity: 0;
      transform: translateX(120%) scale(0.8);
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0) scale(1)";
    });

    // Animate out
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(120%) scale(0.8)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        this.notifications.delete(message);
      }, 500);
    }, 3000);
  }

  showAlert(message, type = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `custom-alert ${type}`;

    const colors = {
      error: {
        bg: "linear-gradient(135deg, #ff4757, #ff3838)",
        shadow: "rgba(255, 71, 87, 0.4)",
      },
      success: {
        bg: "linear-gradient(135deg, #2ed573, #1dd1a1)",
        shadow: "rgba(46, 213, 115, 0.4)",
      },
      info: {
        bg: "linear-gradient(135deg, #667eea, #764ba2)",
        shadow: "rgba(102, 126, 234, 0.4)",
      },
    };

    alertDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${colors[type].bg};
      color: white;
      padding: 24px 32px;
      border-radius: 16px;
      box-shadow: 0 12px 40px ${colors[type].shadow};
      z-index: 10000;
      max-width: 90vw;
      max-height: 80vh;
      overflow-y: auto;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-line;
      text-align: center;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(20px);
    `;

    // Enhanced close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 16px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;

    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      closeBtn.style.transform = "scale(1.1)";
    });

    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
      closeBtn.style.transform = "scale(1)";
    });

    closeBtn.addEventListener("click", () => this.removeAlert(alertDiv));

    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;
    messageSpan.style.cssText = `
      display: block;
      padding-top: 8px;
      font-weight: 400;
    `;

    alertDiv.appendChild(closeBtn);
    alertDiv.appendChild(messageSpan);
    document.body.appendChild(alertDiv);

    // Animate in
    requestAnimationFrame(() => {
      alertDiv.style.opacity = "1";
      alertDiv.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Auto-remove with type-specific timing
    const autoRemoveTime = type === "error" ? 8000 : 6000;
    setTimeout(() => this.removeAlert(alertDiv), autoRemoveTime);

    // Remove on click outside
    setTimeout(() => {
      const outsideClickHandler = (e) => {
        if (!alertDiv.contains(e.target)) {
          this.removeAlert(alertDiv);
          document.removeEventListener("click", outsideClickHandler);
        }
      };
      document.addEventListener("click", outsideClickHandler);
    }, 200);
  }

  removeAlert(alertDiv) {
    if (alertDiv?.parentNode) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 400);
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const colors = {
      info: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      success: "linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%)",
      error: "linear-gradient(135deg, #ff4757 0%, #ff3838 100%)",
    };

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      z-index: 9999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 13px;
      font-weight: 500;
      max-width: 320px;
      opacity: 0;
      transform: translateX(120%);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    });

    // Animate out
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(120%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 4000);
  }

  // ===== ENHANCED ANIMATIONS =====
  async setupAnimations() {
    this.addAnimationStyles();
  }

  addAnimationStyles() {
    if (document.querySelector("#enhanced-animations")) return;

    const style = document.createElement("style");
    style.id = "enhanced-animations";
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes slideInScale {
        from { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.8) rotate(-5deg); 
        }
        to { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1) rotate(0deg); 
        }
      }

      @keyframes slideOutScale {
        from { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1) rotate(0deg); 
        }
        to { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.8) rotate(5deg); 
        }
      }

      @keyframes slideInRight {
        from { 
          opacity: 0; 
          transform: translateX(100%) scale(0.9); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
      }

      @keyframes slideOutRight {
        from { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
        to { 
          opacity: 0; 
          transform: translateX(100%) scale(0.9); 
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .password-rule {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .password-rule:hover {
        transform: translateX(4px);
      }
    `;
    document.head.appendChild(style);
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====
  async setupAccessibility() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // Close mobile menu
        const mobileMenu = document.getElementById("mobileMenu");
        const mobileMenuBtn = document.getElementById("mobileMenuBtn");
        if (mobileMenu?.classList.contains("show")) {
          this.closeMobileMenu(mobileMenu, mobileMenuBtn);
        }

        // Close alerts
        const alerts = document.querySelectorAll(".custom-alert");
        alerts.forEach((alert) => this.removeAlert(alert));
      }
    });

    // Add focus indicators for better keyboard navigation
    const focusableElements = document.querySelectorAll(
      'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        element.style.outline = "2px solid #667eea";
        element.style.outlineOffset = "2px";
      });

      element.addEventListener("blur", () => {
        element.style.outline = "none";
      });
    });
  }

  // ===== FORM ENHANCEMENTS =====
  async setupFormEnhancements() {
    const submitButtons = document.querySelectorAll(
      'input[type="submit"], .submit-btn, .final-submit'
    );

    submitButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const originalText = btn.value || btn.textContent;
        this.addLoadingState(btn, originalText);
      });
    });
  }

  addLoadingState(button, originalText) {
    button.disabled = true;
    button.style.opacity = "0.7";
    button.style.transform = "scale(0.98)";
    button.value = "Processing...";

    // Add loading animation
    button.style.animation = "pulse 1s infinite";

    setTimeout(() => {
      button.disabled = false;
      button.style.opacity = "1";
      button.style.transform = "scale(1)";
      button.style.animation = "";
      button.value = originalText;
    }, 2500);
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.showNotification("🎉 Welcome to Kumar's Non-Veg Hub!", "success");
    }, 1200);
  }
}

// ===== ENHANCED GLOBAL FUNCTIONS =====
async function showThankYouMessage() {
  const fishCheckboxes = document.querySelectorAll(
    'input[name="maincoursefish"]:checked'
  );

  if (fishCheckboxes.length === 0) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "custom-alert error";
    alertDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff4757, #ff3838);
      color: white;
      padding: 24px 32px;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(255, 71, 87, 0.4);
      z-index: 10000;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      text-align: center;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(20px);
    `;
    alertDiv.textContent =
      "Please select at least one fish main course item! 🐟";

    document.body.appendChild(alertDiv);

    // Animate in
    requestAnimationFrame(() => {
      alertDiv.style.opacity = "1";
      alertDiv.style.transform = "translate(-50%, -50%) scale(1)";
    });

    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.style.opacity = "0";
        alertDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
          }
        }, 400);
      }
    }, 4000);
    return;
  }

  // Enhanced thank you message
  const alertDiv = document.createElement("div");
  alertDiv.className = "custom-alert success";
  alertDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #2ed573, #1dd1a1, #00d2d3);
    color: white;
    padding: 32px 48px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(46, 213, 115, 0.4);
    z-index: 10000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
    text-align: center;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 450px;
    backdrop-filter: blur(20px);
  `;

  alertDiv.innerHTML = `
    <div style="font-size: 48px; margin-bottom: 20px; animation: pulse 2s infinite;">🎉</div>
    <div style="font-weight: 600; margin-bottom: 12px; font-size: 24px;">Thanks for ordering!</div>
    <div style="font-size: 18px; margin-bottom: 16px;">Have a wonderful day! 😊</div>
    <div style="font-size: 14px; opacity: 0.9; font-style: italic;">Your delicious meal will be prepared with love! ❤️</div>
    <div style="margin-top: 20px; font-size: 12px; opacity: 0.7;">Order ID: #${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}</div>
  `;

  document.body.appendChild(alertDiv);

  // Animate in with celebration effect
  requestAnimationFrame(() => {
    alertDiv.style.opacity = "1";
    alertDiv.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // Clear selections with stagger animation
  setTimeout(() => {
    fishCheckboxes.forEach((cb, index) => {
      setTimeout(() => {
        cb.style.transform = "scale(0.8)";
        cb.checked = false;
        setTimeout(() => {
          cb.style.transform = "scale(1)";
        }, 200);
      }, index * 150);
    });
  }, 1500);

  // Auto-remove
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.style.opacity = "0";
      alertDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 600);
    }
  }, 5000);
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener("DOMContentLoaded", () => {
  const restaurantApp = new RestaurantMenuManager();
  window.restaurantApp = restaurantApp; // Make available globally for debugging

  console.log("🚀 Enhanced Restaurant Menu JavaScript loaded successfully!");
  console.log(
    "✨ Features: ES6+, Advanced Animations, Enhanced UX, Modern Design"
  );
});
