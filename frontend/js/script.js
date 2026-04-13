const initializeSiteShell = () => {
	const header = document.querySelector(".site-header");
	const navToggle = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector(".nav-menu");
	const revealElements = document.querySelectorAll(".reveal");

	const handleScroll = () => {
		if (!header) {
			return;
		}

		if (window.scrollY > 8) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}
	};

	const closeMenu = () => {
		if (!navMenu || !navToggle) {
			return;
		}

		navMenu.classList.remove("open");
		navToggle.setAttribute("aria-expanded", "false");
	};

	if (navToggle && navMenu && !navToggle.dataset.bound) {
		navToggle.addEventListener("click", () => {
			const isOpen = navMenu.classList.toggle("open");
			navToggle.setAttribute("aria-expanded", String(isOpen));
		});

		navMenu.addEventListener("click", (event) => {
			if (event.target.tagName === "A") {
				closeMenu();
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				closeMenu();
			}
		});

		navToggle.dataset.bound = "true";
	}

	if (revealElements.length) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		revealElements.forEach((element) => {
			if (!element.classList.contains("is-visible")) {
				observer.observe(element);
			}
		});
	}

	if (!window.__agcBlogToggleBound) {
		document.addEventListener("click", (event) => {
			const button = event.target.closest(".blog-read-more");
			if (!button) {
				return;
			}

			const card = button.closest(".blog-card");
			const preview = card?.querySelector(".blog-preview");
			const full = card?.querySelector(".blog-full");
			if (!preview || !full) {
				return;
			}

			const expanded = !full.hidden;
			full.hidden = expanded;
			preview.hidden = !expanded;
			button.textContent = expanded ? "Read More" : "Show Less";
		});

		window.__agcBlogToggleBound = true;
	}


};

window.initializeSiteShell = initializeSiteShell;
document.addEventListener("DOMContentLoaded", initializeSiteShell);
document.addEventListener("layout:ready", initializeSiteShell);
