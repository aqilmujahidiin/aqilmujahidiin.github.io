document.addEventListener('DOMContentLoaded', () => {
    const statusCheckboxes = document.querySelectorAll('.status-container input');
    statusCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            statusCheckboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });
        });
    });
});

let packageCount = 0;

function addPackage() {
    packageCount++;
    const packageOptions = document.getElementById('packageOptions');
    const packageDiv = document.createElement('div');
    packageDiv.classList.add('package');
    packageDiv.setAttribute('id', `package${packageCount}`);
    packageDiv.innerHTML = `
        <label for="package${packageCount}">Package ${packageCount}:</label>
        <input type="text" id="package${packageCount}Description" name="package${packageCount}Description" placeholder="Package description" class="input-full-width">
        <input type="number" id="price${packageCount}" name="price${packageCount}" placeholder="Price (USD)" class="input-half-width">
        <button class="gohapus"type="button" onclick="removePackage(${packageCount})">x</button>
    `;
    packageOptions.appendChild(packageDiv);
}

function removePackage(id) {
    const packageDiv = document.getElementById(`package${id}`);
    packageDiv.remove();
}

function toggleDiscountInput() {
    const isPromo = document.getElementById('isPromo').checked;
    const discountField = document.getElementById('discountField');
    discountField.style.display = isPromo ? 'block' : 'none';
}

function generateHTML() {
    const normalPrice = document.getElementById('normalPrice').value;
    const isPromo = document.getElementById('isPromo').checked;
    const productDiscount = isPromo ? document.getElementById('productDiscount').value : '0';
    const productStatus = document.querySelector('input[name="productStatus"]:checked') ? document.querySelector('input[name="productStatus"]:checked').value : '';
    const productDescription = document.getElementById('productDescription').value.replace(/\n/g, '<br/>');
    const productImage = document.getElementById('productImage').value;

    let packageHTML = '';
    for (let i = 1; i <= packageCount; i++) {
        if (document.getElementById(`package${i}`)) {
            const packageDescription = document.getElementById(`package${i}Description`).value;
            const packagePrice = document.getElementById(`price${i}`).value;
            packageHTML += `<li>${packageDescription}:${packagePrice}</li>`;
        }
    }

    const html = `
<div class="remove_element" style="background: lightgray; border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; max-width: 88%; padding: 20px; text-align: center;">Photo</div>
<figure class="productPhoto remove_style" style="border: 1px solid lightgray; margin: 0px 0px 20px; max-width: 88%; overflow: hidden; padding: 20px; text-align: center;">
    <div class="separator" style="clear: both; text-align: center;"><a href="${productImage}" imageanchor="1" style="background-color: lightgrey; font-family: Roboto, sans-serif; font-size: 14.4px; margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="1080" data-original-width="1080" height="320" src="${productImage}" width="320" /></a></div><br /><div class="separator" style="clear: both; text-align: center;"><br /></div>
</figure>
<div class="remove_element" style="background: lightgray; border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; max-width: 88%; padding: 20px; text-align: center;">Detail</div>
<div class="productDetail remove_style" style="border: 1px solid lightgray; margin: 0px; max-width: 88%; overflow: hidden; padding: 20px;">
    <div class="remove_style" style="text-align: center;">
        <div class="remove_element" style="background: lightgray; border: 1px solid lightgray; display: inline-block; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; padding: 20px; text-align: center; width: 40%;">Status</div>
        <div class="data_stock remove_style" style="box-shadow: lightgray 0px 0px 0px 1px inset; display: inline-block; font-family: Roboto, sans-serif; margin: 0px; padding: 20px; text-align: center; width: 40%;">${productStatus}</div>
    </div>
    <br class="remove_element" />
    <div class="remove_style" style="text-align: center;">
        <div class="remove_element" style="background: lightgray; border: 1px solid lightgray; display: inline-block; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; padding: 20px; text-align: center; width: 40%;">Normal Price ( USD. )</div>
        <div class="productPrice remove_style" itemprop="price" style="box-shadow: lightgray 0px 0px 0px 1px inset; display: inline-block; font-family: Roboto, sans-serif; margin: 0px; padding: 20px; text-align: center; width: 40%;">${normalPrice}</div>
    </div>
    <br class="remove_element" />
    <div class="remove_style" style="text-align: center;">
        <div class="remove_element" style="background: lightgray; border: 1px solid lightgray; display: inline-block; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; padding: 20px; text-align: center; width: 40%;">Discount ( % )</div>
                <div class="data_discount remove_style" style="box-shadow: lightgray 0px 0px 0px 1px inset; display: inline-block; font-family: Roboto, sans-serif; margin: 0px; padding: 20px; text-align: center; width: 40%;">${productDiscount}</div>
    </div>
</div>
<br />
<br />
<div class="data_option remove_style" style="border: 1px solid lightgray; margin: 0px; max-width: 88%; overflow: hidden; padding: 20px;">
    <div class="option_title remove_style" style="background: lightgray; border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; padding: 20px; text-align: center;">Pilih Paket</div>
    <div class="remove_style" style="border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; padding: 20px;">
        <ul style="text-align: left;">${packageHTML}</ul>
    </div>
</div>
<br /><br />
<div class="remove_element" style="background: lightgray; border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; max-width: 88%; padding: 20px; text-align: center;">Description</div>
<div class="detailDescription remove_style" style="border: 1px solid lightgray; font-family: Roboto, sans-serif; font-size: 90%; margin: 0px; max-width: 88%; overflow: hidden; padding: 20px;">${productDescription}</div>
`;

    document.getElementById('generatedHTML').value = html;
}

function copyToClipboard() {
    const generatedHTML = document.getElementById('generatedHTML');
    generatedHTML.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
}
