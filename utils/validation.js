export function validateCheckout(form){
  const errors = {};
  if (!form.name || form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.address || form.address.trim().length < 5) errors.address = "Enter a valid address.";
  if (!form.city) errors.city = "Enter your city.";
  if (!form.zip || form.zip.trim().length < 4) errors.zip = "Enter a valid ZIP/PIN code.";
  if (!form.card || form.card.replace(/\s/g,'').length < 12) errors.card = "Enter a valid (fake) card number.";
  return errors;
}
