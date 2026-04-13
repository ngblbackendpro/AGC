const initializeSiteShell = () => {
	const header = document.querySelector(".site-header");
	const navToggle = document.querySelector(".nav-toggle");
	const navMenu = document.querySelector(".nav-menu");
	const revealElements = document.querySelectorAll(".reveal");

	const handleScroll = () => {
		if (!header) {
			return;
		}

		header.classList.toggle("scrolled", window.scrollY > 8);
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
			{ threshold: 0.15 }
		);

		revealElements.forEach((element) => {
			if (!element.classList.contains("is-visible")) {
				observer.observe(element);
			}
		});
	}

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeMenu();
		}
	});

	handleScroll();
	if (!window.__agcScrollBound) {
		window.addEventListener("scroll", handleScroll);
		window.__agcScrollBound = true;
	}
};

window.initializeSiteShell = initializeSiteShell;
document.addEventListener("DOMContentLoaded", initializeSiteShell);
document.addEventListener("layout:ready", initializeSiteShell);
