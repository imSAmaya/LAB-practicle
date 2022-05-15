$(function() {
	getBillsInfo();
});

const addPayemnt = (e) => {

    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const acc_num = $("#acc_num").val();
            const cous_id = $("#cous_id").val();
            const pay_date = $("#pay_date").val();
            const payment = $("#payment").val();


            //add bill api

            $.ajax({
                type: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: `pAccNo=+${encodeURIComponent(acc_num)}`+`&pCus=+${encodeURIComponent(cous_id)}`+`&pDate=+${encodeURIComponent(pay_date)}`+`&pAmount=+${encodeURIComponent(payment)}`,
                url: "http://localhost:8080/API/webapi/API/addPaymentInfo",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Payemet Details Saved!',
                            'success'
                        );
                        clearForm();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to save!',
                            'error'
                        );
                    }


                }
            });
        }
    })
}

const updateayemnt = (e) => {

    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const pay_num = $("#pay_id").val();
            const acc_num = $("#acc_num").val();
            const cous_id = $("#cous_id").val();
            const pay_date = $("#pay_date").val();
            const payment = $("#payment").val();


            //add bill api

            $.ajax({
                type: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({pID: pay_num,pAccNo: acc_num, pCus : cous_id,pDate: pay_date,pAmount:payment}),
                url: "http://localhost:8080/API/webapi/API/updatePaymentInfo",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Payemet Details Saved!',
                            'success'
                        );
                        clearForm();
                        $("#addBtn").show();
                        $("updateBtn").hide();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to save!',
                            'error'
                        );
                    }


                }
            });
        }
    })
}

const getBillsInfo = () => {
    $.ajax({
		type: "GET",
		url: "http://localhost:8080/API/webapi/API/getAllPaymentInfo",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		//data: $.param({username: $scope.userName, password: $scope.password}),
		success: function (data) {
			 
			$('#tblViewPayement').html('');
            $.each(data.data, function (i, bill) {
				appenPayemntTable(bill);
			});
			
		}
	});
}

const appenPayemntTable = (item) => {
	
	let textToInsert = '';
	textToInsert += addRow(item);
	$('#tblViewPayement > tbody').append(textToInsert);
};

const addRow = (item) => {
	
	const delete_btn = '<button type="button" class="btn btn-danger btn-xs" id="' + item.pID + 'delete" onclick="removepayemnt(\'' + item.idbill + '\')"><span class="fas fa-trash-alt"></span>&nbsp;Delete Payement</button>';
	
    //pay_num,acc_num,cous_id,pay_date,payment
    const update_btn = '<button type="button" class="btn btn-waring btn-xs" id="' + item.pID + 'delete" onclick="setUpdateData(\'' + item.pID+'\',\''+item.pAccNo+ '\',\''+item.pCus+'\',\''+item.pDate+'\',\''+item.pAmount+'\')"><span class="fas fa-edit"></span>&nbsp;Edit Payement</button>';
	
//idpay_bill, cus_id, bill_no, month, tot_amount, status
	let row = '<tr id="' + item.pID + '">'
        + '<td>' + item.pID + '</td>'
		+ '<td>' + item.pAccNo + '</td>'
		+ '<td>' + item.pCus + '</td>'
		+ '<td>' + item.pDate + '</td>'
		+ '<td>' + item.pAmount + '</td>'
		+ '<td>'
			+ update_btn
		+ '</td>'
		+ '<td>'
			+ delete_btn
		+ '</td>'
		+ '</tr>';
	return row;
};


const setUpdateDate=(pay_num,acc_num,cous_id,pay_date,payment)=>{

    $("#pay_id").val(pay_num);
    $("#acc_num").val(acc_num);
    $("#cous_id").val(cous_id);
    $("#pay_date").val(pay_date);
    $("#payment").val(payment);

    $("#addBtn").hide();
    $("updateBtn").show();
}

const removepayemnt = (ids) => {

    // e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const pay_num = ids;

            //add bill api

            $.ajax({
                type: "POST",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: `paymentData=+${encodeURIComponent(pay_num)}`,
                url: "hhttp://localhost:8080/API/webapi/API/removePaymentInfo",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        Swal.fire(
                            'Successful!',
                            'Payemet Details Removed!',
                            'success'
                        );
                        clearForm();
                        getBillsInfo();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Unable to remove!',
                            'error'
                        );
                    }


                }
            });
        }
    })
}

