<?php


// Change this with your blog name and email address
$the_blogname   = 'Le Rose Residence';
$the_myemail 	= 'info@leroseresidence.net';


if(isset($_POST['email'])){
		error_reporting(0);	
		$errorC = false;

		$the_email 		= $_POST['email'];
		$the_name 		= $_POST['yourname'];
		$the_message 	= $_POST['message'];

		$the_phone 		= $_POST['phone'];
		$the_fax 		= $_POST['fax'];
		$the_company 	= $_POST['company'];
		$the_website 	= $_POST['website'];
		
		# want to add aditional fields? just add them to the form in template_contact.php,
		# you dont have to edit this file
		
		//added fields that are not set explicit like the once above are combined and added before the actual message
		$already_used = array('email','yourname','message','phone','fax','company','website','myblogname','tempcode','temp_url','ajax');
		$attach = '';
		
		foreach ($_POST as $key => $field)
		{
			if(!in_array($key,$already_used))
			{
				$attach.= $key.": ".$field."<br /> \n";
			}
		}
		$attach.= "<br /> \n";
		#numeri telfononici validi
		if (strpos($the_phone, "3")!=0 && strpos($the_phone, "0")!=0) {
			$errorC = true;
		}
		
		if(!checkmymail($the_email))
		{
			$errorC = true;
			$the_emailclass = "error";
		}else{
			$the_emailclass = "valid";
			}
		
		if($the_message == "")
		{
			$errorC = true;
			$the_messageclass = "error";
		}else{
			$the_messageclass = "valid";
			}
		
		if($errorC == false)
		{ 	
			$to      =  $the_myemail;
			$subject = "Nuovo Messaggio da" . $the_blogname;
			$header  = 'MIME-Version: 1.0' . "\r\n";
			$header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
			$header .= 'From:'. $the_email  . " \r\n";
		
			$message1 = nl2br($the_message);

			if(!empty($the_name)) 		$the_name 		= "Nome:  	$the_name <br/>";
			if(!empty($the_company)) 	$the_company 	= "Tipo Supporto: $the_company <br/>";
			if(!empty($the_phone)) 		$the_phone 		= "Telefono:   $the_phone <br/>";
			if(!empty($the_fax)) 		$the_fax 		= "Fax:  	$the_fax <br/>";
			if(!empty($the_website)) 	$the_website 	= "Website: $the_website <br/>";
			
			$message = "
			Nuovo messaggio per Le Rose Residence! <br/>
			$the_name
			$the_company
			$the_phone
			$the_website
			
			$attach <br />
			
			Messaggio: $message1 <br />";
			
		
			
			if(@mail($to,$subject,$message,$header)) $send = true; else $send = false;
			
			if(isset($_POST['ajax'])){
				
			if ($send)
			echo '<h3>Il Messaggio è stato inviato con successo!</h3><div class="confirm">
					<p class="textconfirm">Grazie per averci contattato.<br/>Sarà nostra cura rispondervi al più presto possibile.</p>
				  </div>';
			else
			echo '<h3>Oops!</h3><div class="confirm">
					<p class="texterror">A causa di un errore sconosciuto, la sua richiesta non è stata inviata, si prega di reinviarla o riprovare più tardi.</p>
				  </div>'; 
				
			}
		}
		
}
	
	
function checkmymail($mailadresse){
	$email_flag=preg_match("!^\w[\w|\.|\-]+@\w[\w|\.|\-]+\.[a-zA-Z]{2,4}$!",$mailadresse);
	return $email_flag;
}

?>