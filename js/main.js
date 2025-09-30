/* ===================================================================
 * Monica 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

    'use strict';

    const cfg = {

        // MailChimp URL
        mailChimpURL: 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'

    };


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function () {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader')) {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function (e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function (link) {

            link.addEventListener("click", function (event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function () {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu

    /* photoswipe
       * ----------------------------------------------------- */
    const ssPhotoswipe = function () {

        const items = [];
        const pswp = document.querySelectorAll('.pswp')[0];
        const folioItems = document.querySelectorAll('.folio-item');
        
        if (!(pswp && folioItems)) return;

        folioItems.forEach(function (folioItem) {

            let folio = folioItem;
            let thumbLink = folioItem.querySelector('.folio-item__thumb-link');

            let href = thumbLink.getAttribute('href');
            let size = thumbLink.dataset.size.split('x');
            let width = size[0];
            let height = size[1];

            let item = {
                src: href,
                w: width,
                h: height
            }


            items.push(item);

        });

        // bind click event
        folioItems.forEach(function (folioItem, i) {

            let thumbLink = folioItem.querySelector('.folio-item__thumb-link');

            thumbLink.addEventListener('click', function (e) {

                e.preventDefault();

                let options = {
                    index: i,
                    bgOpacity: 0.85,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                let lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });

    };  // end ssPhotoSwipe
    const ssAnimateOnScroll = function () {

        const blocks = document.querySelectorAll('[data-animate-block]');

        window.addEventListener('scroll', animateOnScroll);

        function animateOnScroll() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function (current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .1)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains('ss-animated');

                if (inView && (!isAnimated)) {

                    anime({
                        targets: current.querySelectorAll('[data-animate-el]'),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(200, { start: 200 }),
                        duration: 600,
                        easing: 'easeInOutCubic',
                        begin: function (anim) {
                            current.classList.add('ss-animated');
                        }
                    });
                }
            });
        }

    }; // end ssAnimateOnScroll

    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function () {

        const homeSliderSwiper = new Swiper('.home-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1330px
                1331: {
                    slidesPerView: 3,
                    spaceBetween: 48
                },
                // when window width is > 1773px
                1774: {
                    slidesPerView: 4,
                    spaceBetween: 48
                }
            }
        });

        const pageSliderSwiper = new Swiper('.page-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* mailchimp form
     * ---------------------------------------------------- */
    const ssMailChimpForm = function () {

        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {

            // Don't validate submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Get validity
            let validity = field.validity;

            // If valid, return null
            if (validity.valid) return;

            // If field is required and empty
            if (validity.valueMissing) return 'Please enter an email address.';

            // If not the right type
            if (validity.typeMismatch) {
                if (field.type === 'email') return 'Please enter a valid email address.';
            }

            // If pattern doesn't match
            if (validity.patternMismatch) {

                // If pattern info is included, return custom error
                if (field.hasAttribute('title')) return field.getAttribute('title');

                // Otherwise, generic error
                return 'Please match the requested format.';
            }

            // If all else fails, return a generic catchall error
            return 'The value you entered for this field is invalid.';

        };

        // Show error message
        function showError(field, error) {

            // Get field id or name
            let id = field.id || field.name;
            if (!id) return;

            let errorMessage = field.form.querySelector('.mc-status');

            // Update error message
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;

        };

        // Display form status (callback function for JSONP)
        window.displayMailChimpStatus = function (data) {

            // Make sure the data is in the right format and that there's a status container
            if (!data.result || !data.msg || !mcStatus) return;

            // Update our status message
            mcStatus.innerHTML = data.msg;

            // If error, add error class
            if (data.result === 'error') {
                mcStatus.classList.remove('success-message');
                mcStatus.classList.add('error-message');
                return;
            }

            // Otherwise, add success class
            mcStatus.classList.remove('error-message');
            mcStatus.classList.add('success-message');
        };

        // Submit the form 
        function submitMailChimpForm(form) {

            let url = cfg.mailChimpURL;
            let emailField = form.querySelector('#mce-EMAIL');
            let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);

            if (url == '') return;

            url = url.replace('/post?u=', '/post-json?u=');
            url += serialize + '&c=displayMailChimpStatus';

            // Create script with url and callback (if specified)
            var ref = window.document.getElementsByTagName('script')[0];
            var script = window.document.createElement('script');
            script.src = url;

            // Create global variable for the status container
            window.mcStatus = form.querySelector('.mc-status');
            window.mcStatus.classList.remove('error-message', 'success-message')
            window.mcStatus.innerText = 'Submitting...';

            // Insert script tag into the DOM
            ref.parentNode.insertBefore(script, ref);

            // After the script is loaded (and executed), remove it
            script.onload = function () {
                this.remove();
            };

        };

        // Check email field on submit
        mcForm.addEventListener('submit', function (event) {

            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            submitMailChimpForm(this);

        }, false);

    }; // end ssMailChimpForm


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function (box) {

            box.addEventListener('click', function (e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function () {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function () {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function () {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop

    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function () {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        };

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function (trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* inject contact form (for pages without static form)
     * ------------------------------------------------------ */
    const ssInjectContactForm = function () {

        // find the empty right column on contact page
        const rightCol = document.querySelector('.s-content .pagemain .column.xl-5.md-12.u-flexitem-x-right');
        if (!rightCol) return;

        // do nothing if form already exists
        if (rightCol.querySelector('#contact-form')) return;

        rightCol.innerHTML = `
            <form id="contact-form" class="contact-form" novalidate>
                <div class="form-field">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your name">
                </div>
                <div class="form-field">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="you@example.com">
                </div>
                <div class="form-field">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required placeholder="(###) ###-####">
                </div>
                <div class="form-field">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required placeholder="Tell us about your event..."></textarea>
                </div>
                <div class="form-field">
                    <label>
                        <input type="checkbox" id="sms-consent" name="sms_consent" required>
                        By providing your phone number, you agree to receive a text message from Tritiya. Message and Data rates may apply, Message frequency varies. To stop receiving messages, reply 'STOP' at any time. For more information, reply 'HELP'. Privacy Policy <a href="privacy.html">Link</a> & Terms n Conditions <a href="terms.html">Link</a>.
                    </label>
                </div>
                <div class="form-field">
                    <button type="submit" class="btn btn--primary">Submit</button>
                </div>
            </form>
            <div id="contact-success" class="alert-box" style="display:none; margin-top: 1rem;">
                <p>Thank you for contacting Tritiya, our team will get in touch with you shortly</p>
                <span class="alert-box__close">X</span>
            </div>
        `;

        // Hide the left CTA column if present and center the form column
        try {
            const row = rightCol.closest('.row');
            const leftCtaCol = row && row.querySelector('.contact-cta') ? row.querySelector('.contact-cta').closest('.column') : null;
            if (leftCtaCol) {
                leftCtaCol.style.display = 'none';
            }
            if (row) {
                row.style.justifyContent = 'center';
                row.style.alignItems = 'center';
                row.style.minHeight = '70vh';
            }
            // make form column full width but constrained by CSS max-width
            rightCol.style.flex = 'none';
            rightCol.style.width = '100%';
            rightCol.style.maxWidth = '720px';
            rightCol.style.margin = '0 auto';

            // Remove pagemedia section and set its image as background for the pagemain area
            const pageMediaRow = document.querySelector('.s-pagecontent .pagemedia');
            const pageMain = document.querySelector('.s-pagecontent .pagemain');
            if (pageMediaRow && pageMain) {
                const img = pageMediaRow.querySelector('img');
                const bg = img ? (img.getAttribute('src') || img.currentSrc) : null;
                if (bg) {
                    const pageMainContainer = pageMain.closest('.row.width-narrower') || pageMain.closest('.row') || pageMain;
                    if (pageMainContainer && pageMainContainer.style) {
                        pageMainContainer.style.backgroundImage = `url('${bg}')`;
                        pageMainContainer.style.backgroundSize = 'cover';
                        pageMainContainer.style.backgroundPosition = 'center';
                        pageMainContainer.style.borderRadius = '12px';
                    }
                }
                // Hide the media row to avoid duplicate imagery
                pageMediaRow.style.display = 'none';
            }
        } catch (e) { /* no-op */ }
    }; // end ssInjectContactForm

    /* contact form
     * ------------------------------------------------------ */
    const ssContactForm = function () {

        const form = document.querySelector('#contact-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // HTML5 validation
            if (!form.reportValidity()) return;

            const consent = form.querySelector('#sms-consent');
            if (consent && !consent.checked) {
                consent.focus();
                return;
            }

            // Show success as modal with overlay
            const success = document.getElementById('contact-success');
            if (success) {
                let overlay = document.getElementById('modal-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'modal-overlay';
                    document.body.appendChild(overlay);
                }
                success.classList.add('modal', 'alert-box', 'alert-box--success');
                success.style.display = 'block';
            } else {
                alert("Thank you for contacting Tritiya, our team will get in touch with you shortly");
            }

            form.reset();
        });

        // allow closing success message if it has a close button
        const closeBtn = document.querySelector('#contact-success .alert-box__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                const box = document.getElementById('contact-success');
                const overlay = document.getElementById('modal-overlay');
                if (box) box.style.display = 'none';
                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            });
        }

    }; // end ssContactForm

    /* ensure footer has legal links
     * ------------------------------------------------------ */
    const ssEnsureFooterLegalLinks = function () {
        const list = document.querySelector('.s-footer__site-links .link-list');
        if (!list) return;

        const hasPrivacy = !!list.querySelector('a[href="privacy.html"]');
        const hasTerms = !!list.querySelector('a[href="terms.html"]');

        if (!hasPrivacy) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = 'privacy.html';
            a.textContent = 'Privacy Policy';
            li.appendChild(a);
            list.appendChild(li);
        }

        if (!hasTerms) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = 'terms.html';
            a.textContent = 'Terms & Conditions';
            li.appendChild(a);
            list.appendChild(li);
        }
    }; // end ssEnsureFooterLegalLinks

    /* remove Elfsight (uses eval) to satisfy strict CSP
     * ------------------------------------------------------ */
    const ssRemoveElfsight = function () {
        try {
            // remove platform script tags before they execute
            document.querySelectorAll('script[src*="static.elfsight.com/platform/platform.js"]').forEach(function (s) {
                s.parentNode && s.parentNode.removeChild(s);
            });
            // remove widget containers
            document.querySelectorAll('[class*="elfsight-app-"]').forEach(function (n) {
                n.parentNode && n.parentNode.removeChild(n);
            });
        } catch (e) {
            // no-op if not present
        }
    }; // end ssRemoveElfsight

    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        // remove CSP-incompatible third-party widgets before anything else
        ssRemoveElfsight();

        ssPreloader();
        ssMobileMenu();
        ssPhotoswipe();
        ssSwiper();
        ssMailChimpForm();
        ssAlertBoxes();
        ssMoveTo();
        ssAnimateOnScroll();
        ssInjectContactForm();
        ssContactForm();
        ssEnsureFooterLegalLinks();

    })();

})(document.documentElement);