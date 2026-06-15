import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "./ContactForm.css";

const ContactForm = () => {
	const { t, i18n } = useTranslation();
	const form = useRef();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const websiteUrl = "https://movie-discovery-app-gamma.vercel.app/";
	const websiteName = "MovieApp - Movie Discovery App (Arabic)";
	const isRTL = i18n.language === "ar";

	const sendEmails = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Send email to owner (you)
			await emailjs.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
				form.current,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				{
					user_email: form.current.user_email.value,
					user_name: form.current.user_name.value,
					website_url: form.current.website_url.value,
					message: form.current.message.value,
					subject: form.current.subject.value,
					website_name: form.current.website_name.value,
				}
			);

			// Send confirmation email to user
			await emailjs.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID,
				form.current,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				{
					user_name: form.current.user_name.value,
					website_url: form.current.website_url.value,
					website_name: form.current.website_name.value,
				}
			);

			toast.success(t("contact_success"), {
				position: "top-center",
				rtl: isRTL,
			});
			form.current.reset();
		} catch (error) {
			toast.error(t("contact_error"), {
				position: "top-center",
				rtl: isRTL,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="contact-section">
			<div className="container">
				<div className="contact-content">
					<h2 className="section-title text-center mb-5">{t("contact_us")}</h2>
					<form ref={form} onSubmit={sendEmails} className="contact-form">
						<div className="form-group">
							<input
								type="text"
								name="user_name"
								placeholder={t("contact_name")}
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								name="user_email"
								placeholder={t("contact_email")}
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="subject"
								placeholder={t("contact_subject")}
								required
							/>
						</div>
						<div className="form-group">
							<textarea
								name="message"
								placeholder={t("contact_message")}
								required
							></textarea>
						</div>
						<input type="hidden" name="website_url" value={websiteUrl} />
						<input type="hidden" name="website_name" value={websiteName} />
						<button
							type="submit"
							className="submit-btn"
							disabled={isSubmitting}
						>
							{isSubmitting ? t("contact_sending") : t("contact_send")}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
