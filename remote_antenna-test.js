/*---------------------------------------*/
/* Clear All Fields & Hide Results Table */
/*---------------------------------------*/
function resetForm() {
    $('.results_table').hide();
    $('.cable_option').hide();
    $('.results_diagram').html('');
    $('.amp_setting').hide();
    $('.cable_length').hide();  
    $('.note').hide();
}

/*---------------------------------------*/
/* Determine Length of Cable, in feet or meters */
/*---------------------------------------*/
function cableLength(distance, measurement) {
    if (measurement == 'feet') {
        return Math.ceil(distance/10) * 10;
    }
    else {
       return Math.ceil(distance/3.048) * 3;
   }
}

/*---------------------------------------*/
/* Load Inital Table Data */
/*---------------------------------------*/
function intialOptionData(length_num, option_count, cable_type, cable_length, measurement) {
    $('#results_table' + option_count).show();
    $('#cable_option' + option_count).show().html('Option #' + option_count);
    $('#cable_type' + option_count).html(cable_type);
    $('#cable_length' + length_num + '_' + option_count).html(cable_length + ' ' + measurement);    
}

/*--------------------------*/
/* Add Amp Settings */
/*--------------------------*/
function ampSetting(length_num, option_count, antenna, amp_setting) {
    if (antenna == 'UA8 / UA820') {
        antenna = 'UA830';
    }

    $('.amp_setting'  + length_num + '_' + option_count).show();
    $('.amp_setting' + length_num + '_' + option_count).html(antenna + ' Setting for Length ' + length_num + ': ');
    $('#amp_setting' + length_num + '_' + option_count).html(amp_setting);

    if (length_num == 1) {
        $('.note' + option_count).show();
        $('#note' + option_count).html('The ' + antenna + ' cannot be connected directly to a BLX4, QLXD4, SLX4 or UC4 receiver.');    
    }
}

/*---------------------------*/
/* Add Second Cable */
/*---------------------------*/
function secondCable(option_count, cable_length, measurement, max_length_in_feet, max_length_in_meters) {
    if (measurement == 'feet') {
        $('#cable_length1_' + option_count).html(max_length_in_feet + ' ' + measurement);
        $('.cable_length2_' + option_count).show();
        $('#cable_length2_' + option_count).html((cable_length - max_length_in_feet) + ' ' + measurement);
    }
    else {
        $('#cable_length1_' + option_count).html(max_length_in_meters + ' ' + measurement);
        $('.cable_length2_' + option_count).show();
        $('#cable_length2_' + option_count).html((cable_length - max_length_in_meters) + ' ' + measurement);
    }
}

/*---------------------------------------*/
/* Add Image */
/*---------------------------------------*/
function addImage(option_count, antenna, image_num) {
    if (antenna == 'UA8 / UA820') {
        antenna = 'UA8';
    }

    $('#results_diagram' + option_count).show().html('<img src="https://web.archive.org/web/20170623050929/http://c1df5f0a8015027db711-c20b94b839b8a317e2e6dd87feb4537f.r75.cf2.rackcdn.com/images/' + antenna.toLowerCase() + '-' + image_num + '.gif">');
}

/*---------------------------------------*/
/* Form Results */
/*---------------------------------------*/
$('#user_form').on('submit', function () {

    resetForm();

    var option_count = 1; 
    var amp_neg6db = '-6 dB';
    var amp_0db = '0 dB';
    var amp_pos3db = '+3 dB';
    var amp_pos6db = '+6 dB';
    var amp_pos10db = '+10 dB';
    var amp_pos12db = '+12 dB';

    var distance = $('#user_distance').val(); 
    var measurement = $('input:radio[name=measurement]:checked').val();
    var antenna =  document.getElementById('antenna').value;
    var cable_length = cableLength(distance, measurement);

    $('#results_description').html('A wireless system with a distance of  <b>' + distance + ' ' + measurement + '</b> between the <b>' + antenna + '</b> antenna and the receiver should use one of the following setups:');

   if ((antenna == 'UA874' && ((distance < 401 && measurement == 'feet') || (distance < 122 && measurement == 'meters'))) || ((antenna == 'UA8 / UA820' || antenna == 'UA870') && (distance < 601 && measurement == 'feet') || (distance < 183 && measurement == 'meters'))) {

        if ((antenna == 'UA870' || antenna == 'UA874') && ((distance < 11 && measurement == 'feet') || (distance < 4 && measurement == 'meters'))) {
            $('#results_description').html('<span style="color: red;"><b>' + distance + ' ' + measurement + '</b> is too short.</span><br><br>Input a distance greater than 10 feet or 3 meters.');
        }
        else { /* Cable Options */ 

            /* Options for RG58C/U (Belden 8262) */
            if ((distance < 21 && measurement == 'feet') || (distance < 6 && measurement == 'meters')) {
                var cable_type = 'RG58C/U (Belden 8262)';
                intialOptionData(1, option_count, cable_type, cable_length, measurement);
                addImage(option_count, antenna, 1);

                if (antenna == 'UA870') {
                    ampSetting(1, option_count, antenna, amp_pos3db);
                } else if (antenna == 'UA874') {
                    ampSetting(1, option_count, antenna, amp_0db);
                }              
                option_count++;
            } 
            /* End Options for RG58C/U (Belden 8262) */


            /* Options for RG213/U (Belden 8267) */
            if (antenna == 'UA874' ) {
                if ((distance < 281 && measurement == 'feet') || (distance < 85 && measurement == 'meters')) {
                    var cable_type = 'RG213/U (Belden 8267)';
                    intialOptionData(1, option_count, cable_type, cable_length, measurement);
                    addImage(option_count, antenna, 1);

                    if ((distance < 21 && measurement == 'feet') || (distance < 6 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_neg6db);
                    }
                    else if ((distance < 121 && measurement == 'feet') || (distance < 36 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_0db);
                    }
                    else if ((distance < 221 && measurement == 'feet') || (distance < 67 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_pos6db);
                    }
                    else {
                        ampSetting(1, option_count, antenna, amp_pos12db);
                    }

                    option_count++;
                }
            }
            else { // UA8 / UA820 & UA870
                 if ((distance < 361 && measurement == 'feet') || (distance < 110 && measurement == 'meters')) {
                    var cable_type = 'RG213/U (Belden 8267)';
                    intialOptionData(1, option_count, cable_type, cable_length, measurement);

                    if ((antenna == 'UA8 / UA820') && ((distance < 41 && measurement == 'feet') || (distance < 12 && measurement == 'meters'))) {
                        addImage(option_count, antenna, 1);
                    }
                    else if ((distance < 91 && measurement == 'feet') || (distance < 27 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_pos3db);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 1);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 2);
                        }
                    }
                    else if ((distance < 211 && measurement == 'feet') || (distance < 64 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 1);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 2);
                        }
                    }
                    else if ((distance < 251 && measurement == 'feet') || (distance < 76 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        ampSetting(2, option_count, antenna, amp_pos3db);
                        secondCable(option_count, cable_length, measurement, 180, 54);
                        addImage(option_count, antenna, 2);
                    }
                    else {
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        ampSetting(2, option_count, antenna, amp_pos10db);
                        secondCable(option_count, cable_length, measurement, 180, 54);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 2);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 3);
                        }
                    }
                    option_count++;
                }
            } /* End Options for RG213/U (Belden 8267) */

            /* Options for RG-8X/U (Belden 9258) */
            if (antenna == 'UA874' ) { 
                if ((distance < 211 && measurement == 'feet') || (distance < 64 && measurement == 'meters')) {
                    var cable_type = 'RG-8X/U (Belden 9258)';
                    intialOptionData(1, option_count, cable_type, cable_length, measurement);
                    addImage(option_count, antenna, 1);

                    if ((distance > 10 && distance < 71 && measurement == 'feet') || (distance > 3 && distance < 21 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_0db); 
                    }
                    else if ((distance < 141 && measurement == 'feet') || (distance < 42 && measurement == 'meters')) {    
                        ampSetting(1, option_count, antenna, amp_pos6db);
                    }
                    else {    
                        ampSetting(1, option_count, antenna, amp_pos12db);
                    }

                    option_count++;
                }
            }
            else  { // UA8 / UA820 & UA870
                if ((distance < 211 && measurement == 'feet') || (distance < 64 && measurement == 'meters')) {
                    var cable_type = 'RG-8X/U (Belden 9258)';
                    intialOptionData(1, option_count, cable_type, cable_length, measurement);
                    
                    if ((antenna == 'UA8 / UA820') && ((distance < 21 && measurement == 'feet') || (distance < 6 && measurement == 'meters'))) {    
                        addImage(option_count, antenna, 1);
                    } 
                    else if ((distance < 61 && measurement == 'feet') || (distance < 18 && measurement == 'meters')) { 
                        ampSetting(1, option_count, antenna, amp_pos3db);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 1);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 2);
                        }
                    }
                    else if ((distance < 121 && measurement == 'feet') || (distance < 36 && measurement == 'meters')) {    
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 1);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 2);
                        }
                    }
                    else if ((distance < 151 && measurement == 'feet') || (distance < 46 && measurement == 'meters')) {    
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        ampSetting(2, option_count, antenna, amp_pos3db);
                        secondCable(option_count, cable_length, measurement, 105, 32);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 2);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 3);
                        }
                    }
                    else {
                        ampSetting(1, option_count, antenna, amp_pos10db);
                        ampSetting(2, option_count, antenna, amp_pos10db);
                        secondCable(option_count, cable_length, measurement, 105, 32);
                        if (antenna == 'UA870') {
                            addImage(option_count, antenna, 2);
                        }
                        else { // UA8
                            addImage(option_count, antenna, 3);
                        }
                    }
                    option_count++;
                }
            } /* End Options for RG-8X/U (Belden 9258) */

            /* Options for RG-8/U (Belden 9913) */
            if (antenna == 'UA874') {
                if ((distance < 401 && measurement == 'feet') || (distance < 211 && measurement == 'meters')) {
                    var cable_type = 'RG-8/U (Belden 9913)';
                    intialOptionData(1, option_count, cable_type, cable_length, measurement);
                    addImage(option_count, antenna, 1);

                    if ((distance > 10 && distance < 21 && measurement == 'feet') || (distance > 3 && distance < 6 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_neg6db);
                    }
                    else if ((distance < 151 && measurement == 'feet') || (distance < 46 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_0db);
                    }
                    else if ((distance < 311 && measurement == 'feet') || (distance < 94 && measurement == 'meters')) {
                        ampSetting(1, option_count, antenna, amp_pos6db);
                    }
                    else {
                        ampSetting(1, option_count, antenna, amp_pos12db);
                    }

                    option_count++;
                }
            }
            else { // UA8 / UA820 & UA870
                if ((distance < 601 && measurement == 'feet') || (distance < 183 && measurement == 'meters')) {
                    var cable_type = 'RG-8/U (Belden 9913)';

                    if ((antenna == 'UA8 / UA820') && ((distance < 21 && measurement == 'feet') || (distance < 4 && measurement == 'meters'))) {
                        // Show nothing.
                    }
                    else {
                        intialOptionData(1, option_count, cable_type, cable_length, measurement);

                        if ((antenna == 'UA8 / UA820') && ((distance > 20 && distance < 71 && measurement == 'feet') || (distance > 6 && distance < 21 && measurement == 'meters'))) {
                            addImage(option_count, antenna, 1);
                        }
                        else if ((distance > 20 && distance < 181 && measurement == 'feet') || (distance > 3 && distance < 55 && measurement == 'meters')) {
                            ampSetting(1, option_count, antenna, amp_pos3db);
                            if (antenna == 'UA870') {
                                addImage(option_count, antenna, 1);
                            }
                            else { // UA8
                                addImage(option_count, antenna, 2);
                            }
                        }
                        else if ((distance < 351 && measurement == 'feet') || (distance < 106 && measurement == 'meters')) { 
                            ampSetting(1, option_count, antenna, amp_pos10db);
                            if (antenna == 'UA870') {
                                addImage(option_count, antenna, 1);
                            }
                            else { // UA8
                                addImage(option_count, antenna, 2);
                            }
                        }
                        else if ((distance < 421 && measurement == 'feet') || (distance < 128 && measurement == 'meters')) {
                            ampSetting(1, option_count, antenna, amp_pos10db);
                            ampSetting(2, option_count, antenna, amp_pos3db);
                            secondCable(option_count, cable_length, measurement, 300, 91); 
                            if (antenna == 'UA870') {
                                addImage(option_count, antenna, 2);
                            }
                            else { // UA8
                                addImage(option_count, antenna, 3);
                            }
                        }
                        else {
                            ampSetting(1, option_count, antenna, amp_pos10db);
                            ampSetting(2, option_count, antenna, amp_pos10db);
                            secondCable(option_count, cable_length, measurement, 300, 91);
                            if (antenna == 'UA870') {
                                addImage(option_count, antenna, 2);
                            }
                            else { // UA8
                                addImage(option_count, antenna, 3);
                            }
                        }
                    }
                    option_count++;
                }         
            } /* End Options for RG-8/U (Belden 9913) */
        
        } /* End Cable Options */
    } /* End Optimal Distances */ 
    else {
        $('#results_description').html('<span style="color: red;"><b>' + distance + ' ' + measurement + '</b> is too long.</span><br><br>Try moving the receiver closer to the antenna location and using shorter cable runs to the antenna.');
    }
    return false;
});
