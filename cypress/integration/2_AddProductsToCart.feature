Feature: Test that products can be added to the cart

    Background:
        Given The user navigates to the "demoblaze" web site
        Then The user verifies the title of the page is "STORE"
        Then The user verifies he landed on the home page

    Scenario: The user adds a product to cart and verifies it got added successfully without logging in
        Given The user chooses his category to be "Phones"
        Then The user chooses the product "Samsung galaxy s6"
        Then The user adds the product "2" times to his cart
        When The user navigates to his cart
        Then The user verifies that the product "Samsung galaxy s6" has been added "2" times

    Scenario: The user adds a product to cart and verifies it got added successfully without logging in
        Given The user logs in to the DemoBlaze website
        Given The user chooses his category to be "Phones"
        Then The user chooses the product "Samsung galaxy s6"
        Then The user adds the product "1" times to his cart
        When The user navigates to his cart
        Then The user verifies that the product "Samsung galaxy s6" has been added "1" times


    Scenario: The user adds products to cart and verifies they got added successfully
        Given The user logs in to the DemoBlaze website
        Given The user chooses his category to be "Laptops"
        Then The user chooses the product "Sony vaio i5"
        Then The user adds the product "1" times to his cart
        When The user navigates to his cart
        Then The user verifies that the product "Sony vaio i5" has been added "1" times
        When The user navigates to the home page
        Given The user chooses his category to be "Monitors"
        Then The user chooses the product "Apple monitor 24"
        Then The user adds the product "3" times to his cart
        When The user navigates to his cart
        Then The user verifies that the product "Apple monitor 24" has been added "3" times


# Given The user adds the "Samsung galaxy s6" product to his cart "5" times
# Then The user adds multiple products to his cart
# |productName      |productPage|
# |Samsung galaxy s6|idp_=1     |



