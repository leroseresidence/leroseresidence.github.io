jQuery(document).ready(function(){ 
	tfuse_custom_form();
});

function tfuse_custom_form(){ 
	var my_error;
	var url = jQuery("input[name=temp_url]").attr('value');
	jQuery("#send").bind("click", function(){
		
	my_error = false;
	// Rimuovi messaggi di errore precedenti
	jQuery(".ajax_form .error-message").remove();
	
	jQuery(".ajax_form input, .ajax_form textarea, .ajax_form radio, .ajax_form select").each(function(i)
	{
				var surrounding_element = jQuery(this);
				var value               = jQuery(this).val();
				var check_for 			= jQuery(this).attr("id");
				var required 			= jQuery(this).hasClass("required");

				// Rimuovi messaggio di errore esistente per questo campo
				surrounding_element.next(".error-message").remove();

				if(check_for == "email"){
					surrounding_element.removeClass("error valid");
					baseclases = surrounding_element.attr("class");
					if(!value.match(/^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$/)){
						surrounding_element.attr("class",baseclases).addClass("error");
						surrounding_element.after("<span class='error-message'>Inserire un indirizzo email valido</span>");
						my_error = true;
					}else{
						surrounding_element.attr("class",baseclases).addClass("valid");
					}
				}

				if(check_for == "name"){
					surrounding_element.removeClass("error valid");
					baseclases = surrounding_element.attr("class");
					if(value == "" || value == "Name"){
						surrounding_element.attr("class",baseclases).addClass("error");
						surrounding_element.after("<span class='error-message'>Il nome è obbligatorio</span>");
						my_error = true;
					}else{
						surrounding_element.attr("class",baseclases).addClass("valid");
					}
				}

				if(check_for == "message"){
					surrounding_element.removeClass("error valid");
					baseclases = surrounding_element.attr("class");
					if(value == "" || value == "Message"){
						surrounding_element.attr("class",baseclases).addClass("error");
						surrounding_element.after("<span class='error-message'>Il messaggio è obbligatorio</span>");
						my_error = true;
					}else{
						surrounding_element.attr("class",baseclases).addClass("valid");
					}
				}

				if(required && check_for != "email" && check_for != "message" && check_for != "name"){
					surrounding_element.removeClass("error valid");
					baseclases = surrounding_element.attr("class");
					if(value == ""){
						surrounding_element.attr("class",baseclases).addClass("error");
						surrounding_element.after("<span class='error-message'>Questo campo è obbligatorio</span>");
						my_error = true;
					}else{
						surrounding_element.attr("class",baseclases).addClass("valid");
					}
				}


			   if(jQuery(".ajax_form input, .ajax_form textarea, .ajax_form radio, .ajax_form select").length  == i+1){
					if(my_error == false){
						// Costruisci il mailto link
						var recipientEmail = "info@leroseresidence.com";
						var name = jQuery("#name").val();
						var email = jQuery("#email").val();
						var category = jQuery("#contact_select_1 option:selected").text();
						var subject = jQuery("#subject").val();
						var message = jQuery("#message").val();
						
						var fullSubject = "[" + category + "] " + subject;
						var body = "Nome: " + name + "\n";
						body += "Email: " + email + "\n";
						body += "Categoria: " + category + "\n\n";
						body += "Messaggio:\n" + message;
						
						var mailtoLink = "mailto:" + recipientEmail + 
							"?subject=" + encodeURIComponent(fullSubject) + 
							"&body=" + encodeURIComponent(body);
						
						// Apri il client email
						window.location.href = mailtoLink;
						
						// Mostra messaggio di conferma
						jQuery(".ajax_form").before("<div class='ajaxresponse' style='display: none;'></div>");
						jQuery(".ajaxresponse").html("<p>Il tuo client email si è aperto. Invia l'email per completare la richiesta.</p>").slideDown(400);
					}
				}

			});
			return false;
	});
}
