define([], function() {

    return {
        createContact: function(Testcontact){
             var myContact = navigator.contacts.create(Testcontact);
            myContact.note = "This contact has a note.";
            console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);
        }
    }
});