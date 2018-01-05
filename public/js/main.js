//alert(1);
$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
});

function deleteUser(){

	var confirmation = confirm('Are you sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url: '/user/delete/'+$(this).data('id')

		}).done(function(response){
			/*console.log(this)*/
			window.location.replace('/');
		});
		window.location.replace('/');
	}
	else {
		return false;
	}
}