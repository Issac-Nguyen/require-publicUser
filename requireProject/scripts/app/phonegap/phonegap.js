define([], function() {

    return {
        createContact: function(Testcontact){
             var myContact = navigator.contacts.create(Testcontact);
            myContact.note = "This contact has a note.";
            myContact.save(function(){}, function(err){alert(err);});
            console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);
        }
    }
});