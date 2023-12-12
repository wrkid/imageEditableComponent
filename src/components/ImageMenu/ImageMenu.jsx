import React, { useState, useEffect, useRef } from "react";
import './ImageMenu.scss';

const ImageMenu = ({ handleImageMenu, handleImageChange }) => {

    const [ list, setList ] = useState([]);
    const [ curItem, setCurItem ] = useState({url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGBxQTExYUFBQYFhYZGhwaGxkZGhkaHB0cGx0hGx8dIBoaHysiGhwoIhwaJTQkKCwuMTExGSE3PDcwOyswMS4BCwsLDw4PHBERHDAoISkwMDAwOTAwMDAwMDAwMDAwMDAwMDAwMDAwMDMwMDIwMDkwMDAwMDAuMDAwMzAwMzAuMP/AABEIAJ8BPgMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAFAwQGBwABAgj/xABHEAABAwIDBQUFBQUGBAcBAAABAgMRACEEEjEFBkFRYQcTInGBMpGhscFCUmLR8BQjcpLhM2OCorLxFSQlwhZDRFNzs9I1/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwUEBv/EADARAAICAQQBAgMHBAMAAAAAAAABAhEDBBIhMUFRYRNxgQUUIjORsfAyQqHRFSMk/9oADAMBAAIRAxEAPwA1vMYwr3CUx/MQn60EwKkhr2k6cxTN/ev9owzrTgAcJbykaKGdJUIOigL9RfhTjKAzeNK5uvmpNNehhQFQrM8rjRTYiP8AnGPNX+hVB8Esd8vQCeg4CjexlA4ti/2uE8UmvLj4yw+aBk9Ca3lpXJW8tfRkiWWsy0rlrMtACWWsy0rlrMtACWWsy126oJBUowBcmhDO8SFrypbWQeNp939axnmhBpSdAFMtZkpVKJrYbrWwEu7rMlV12t7xPNPBhp1TaQ2FqyLykqUogXAmwTpP2xaq4Xt/FKEKxLxHIuLP/dScjRQs9F5K2G50qHdkuz8WtPerdUMLcJDhK1OHTMjMZQkEa6G4jiLFAAEJH686W8NgOGFVrYedabZmROnK9P3GjrypItEGZg/7fSKneyljQgMCrp76TcZKdRH650RSkkzf6edKAm9rfP0pqYnjQIy1mWijmESrTwn9cKrve/tFRgnncP3ClutkAHMA2QQFAz7QMEWj1409yJcGTDLWZaqnA9rL5fQXkIDU+JCE3gjgpStZjpVo7L2g1iGw6ysLQeI1B5EG6VdDemmmJxaFctZlpXLWZaokSy1mSlctZlpACtrY9LMDKCo8OnM1H38Y+4tJTmlchAFhGnu1v0o+7sTvXFrcJgkBI5AET7wI9Zok3hEJMhIBCQkdEjgOVc2eHLnlcnUfAxhsnZQZEnxLIur6DpXG3MO4sNpQJBX4/LIqJ6ZsvwotlrShwGp/U17J4Y/CcFwqoCMYpKcMUwZdIHkkTe2pnS/3eFBHV58U6sEEFQmLwoJAIPIyD+poulgv4lVrA/AWnzge80J240hvaDp0lLdrwRlAuNDpXHkm4SriKaSGEtkWxCeRSofI/SnG+RBYAUBlK02VPU6DyoZg8ehGIbUQYGb7J+4Y4c4p5vo+k4dvIc5LqZuJnIo3H2fI16dNK8ElfqHkhu8TwUUCFRBOoCT/AIenWkmMWEMgttguJVBJJkpWJN0jQFA/mNJ7wOKzokH2enM9TUn2VuooNocQqe9bbWQYBSSmVDqJNvKoxqXw/wAKsBHfDdI4V4OtwGHFgAfdUZOSOIsSOluF1XjDYFSbtPEs4dP99m9zax/3VG8amEjyrLXpRlSKkB8Bh/3y7cQf5kgipFsrDxiGOHjFMcM0BiVD8LPxZQaN4YRicPb/AM1FhrrEVh1lj7NEkxDRrpOHPKiLLokAoUgnTNlv5FJInpM0uU19Cp2XsA6miK5y0XU0DTPFshIn4flT3epLjQ0IiuJ5A/L+tc43FNsp7x5aUDhOk8gNSdaR2VtvD4kkMupWRcpuFRpOVQBjrU77dXX7k0JbTdaMNPQM1xcjQ84iulsd20f2dsFVrW48SZv76eY3AodTlWJHxHlQBWzH8MsONnOgan8IvChxHXhXizb4Sbateq7SGPdj4jFZ4eZ8J+0IBHmJuKLqTSmCxKXUBaeOo4g8Qa2W69WFVH+pte46KW3x2gl7EPOuCUz3aQBohBIE+ZlR5ZqD7n7ARj9otsoT+6SStw80Igq00zGEz+MVP9/9ylKUvEMJW5I8bKRJKvvpuNeIvrPOuuw7d1TX7TiFtlClZGU5klKrALcsoSASW/VJ5VTNYvgsZtpKEgJASlIASlIAAAsAALAC1YonhalFkASdKrDtK7R1tOdxg1gQmXHQAYJ0SmbSIknqPRFFkKbV+db7onW9Vv2Sb64h/EHCYlXeeBS0LV7YIOYpNryFSOQTxmrJW74hHz+lAG1kjT+lcB0+c/70F3+3jOAwvfJSFLK0tpBNpMmfIAGoXuR2pOO4hLGL7vK6SELSMuRRjKkjiDpPMjhogLRCgePpUI7Xt1G8VhlvpSBiGUZgoAypCZKkGNbSRyI6mp0WuVI4tsEEEAhQiDx1ke6mB5XUhJUPFA4k8P61avZTDb6mpIztTl4Sgi56wo++oM5sos4hwqEBpRBnS3ESb2irQ7NNiuJz4p2R3gyNIUkhQRMqUQoSCogW5JHOnHsifRMctZlpTLWZa1MRPLWZaUy1mWgBPLWZaUy1mWgBB5YQkqUQEgSSdABSGy3i62l0iAvxJH4D7M9SIPrTLe10oZJ4khCEjitVs56JEkdYPKjSGgkBIEAAADoLCou5V6BQ1ZwqUSUiCoyetQnetEY49W0H5j6VYBTVc7y7Qbexyu7M92gNqPDMkqJjymPMGvDrYxjp3GPHIx3s8xiGT+OPeCK12h4JIcw7wELKihX4kwSJ5wdP4jWsOqHWT/eI/wBQFPO0I3w4/Es+4JH1rz6V/wDml8wIBvIf3qf4B81VaeyEwyyP7pH+kVVW8av33+AfWrcwbf7psckJ/wBIr1aPr6IGRztNxyXHcMylRJSpwqImAYSMsj7V7jhI51H8WDEFSv5jTveHaAexLbQbS2GQ4kBJkHMoSevsi/GabY2ufq57p2OQ9OHWnFuhZBUA0DFhZlAHwj1ogw5lxbAJH9q1HlnAj0+opjttiNp4gKCSQW+H9y3wNKBCRisMYA/fNiw/Gk/Ss8irNXuHktt1sKBB0P6kcj1rlhRIg6gwfz9RB9a7JqPr3iadcyIWnLxObKDHNXL8IueJAsezPJGHLZo2GXsWhM6mNY0HQqMJB6EzQnar2JKFLYZ8Q9kKKZjicptJ68NNZqNbZ3jcYxfd5svdQAFNkNnMAbRpqBblrUy2FthOIQSBCk2UmZjqDxBrzRzfFk4W0xXZV20cS5iVoRiFmUKIWQggozESO6MEhMUYx+xsJsxbT3evOum6Q2UJBHEkwfCQYi8z6057St3Ag/tjQIuO8A4TYODleAfQ86EbF2vCmmcYA4wqShSxcAkglKxcEEXHEDTSsKljm0+/DYiX7vb1YbFK7tOZtzghyBm55SDBPTWj7mH5UFb3LwSil1oKTopKkOEjmFAmdOFSKujjc6/HX0CgTh8B3a1FNkq1TwB5j5R5cqcqp4RXCmhWkIxiqSFQzNO0N5Ujrc+tIONwaeOiB5U5FQQC3w2ujDYV11RAKUmASLk2AHmYqlNzitf7U+2U/taEpU3ICinMs964lChClpGUaeEOE8LWBvHuJjce7mxGLQloKOVptBOVP2TwClefvoxupuFhcF40JLrv/uuQVJ/hAACOOl+ZMVBbVoH7pbMxK3htDGjI4Gyy02buZFEHM4q1/agETCr8KlGHXKsxAHLh61VHarj8ZgdpB9K8zS0JLaVjO2MoCVog6GfFIg+MXpltHtdeW2A033TnEhRUP800Aiz+0jddW0MKlDRAdQsOJCjCVkApKSR7MhRg8wNNarprCjFYbFIewaMO9g2VOh5tpLWVxtXhZIT7YUgaKkgpUZNqabh7z7VxONaAxDjgzBTiFXR3YPilOgtYReSKszejYScewWlLW0rWUqVEjTMiQlYsJkTGhFAHXZfvScfgwpxUvNkocsEyQfCQBwKSn1mpJiPkDVfbibiYjAYhToxDS0EQpAC05tdZmCLRrqdKsJScwmbx0OtAwBs/Y+HV+8Wy0pwKPjKElQg2gkSIoyE032azlCh+JXxM07SK0XRlLs4KK1FOkqnWlGmxyp2LaMYrIon3ImtLYB4Utw9gNisiiBZApJxIHCnYtoFxuAS4qVSSMmUDgAtKz7ygT0Ap4UKPIeV/ifyp3mHKuVGanbzYqGhaVwUfcn8qqBbrIxC0sXSkkFxRu4qTKzwAnSBoJ41czgEETBIgHqRw61W+/mx8PhVYVtpGVGV3qSQUXJNyb615NZC8ba8CGL7hUAArKSQAeRJsbctaLdpWZK8KFa5XSY5/u5oJiAlKQrKJF7dKO9ojyXH8OQuwQuIBM5lASOEW514cDSxSXyKK522/LytbAc/u1daUwlI6D5VS+10gvKhdyQCCmOA0IJ+lXqmFCRcV0NJSj9EFWVjtnD5Me4LmLyTzUoz8a5jM4gfeUke8gUzdeWvEKWpWZcJClczFOsDP7QzJgd63MxpnE1yp1Ka+YmEt5z/1TE+bf/1IpJbkPsnk62bfxD40tvSj/qj/AF7v/wCpFIvWdbP942fcsUs/5/1BloP4HvxDwGSZ7rWY0zK+gt51Ct4Nh/srko/s1XT05pPUfKrEoVvXgu9YUAJUkhQ+R+BNdHV4IvE5eVyU1aIXtPCd8x3upbhKv4D7J9DI8lDlTXch0t4xpsyW3ApAMwUKCSsQdYOWB6jS1TXdbZcMLDibODKQfuwfz+FBdkbCWzjkpIlKTmnoASD8vWvBihKHw5vpuv8AQqfBL8UyFtqad8SFpKCrSQoRB5Hrp5aVBtpbrK/4aUqEu4Z1aknmiQFehTC/QVYhTNjpSGUXQq4UCBPERBB5mPePWurkxqXfy/UqiDdnW2VNOHCPSAoBTc21GYR0UL+Y61Pqj28O7gX3DzQhzD5I/E2gg5bcRBI9RxqRGngjKKcX46BHM1k1kVqtxGlomu1m/lWqxznSZURJY5Uit6OZA8v11rtxVv15VX29m6DrmbEYR1xl6xIQpSUrjTMkGJgxPWKksl+82w8PjmFMPpKkm4IspChYLSYsRfgQRMyKqbF9ieI76GcQ0tk3zqzJUBMEFABBI8wD0opsDe3aqg8HG2VPNZEpbWkpccJmSClYEZQo5hbjXTfafigDnwQBKRHiWEgSFDwlMxlnje2k0XQ0rJhujuixgGu7QolZGZxyLrI0n8IGieEniSSWViQD4RIvp7uVV5je0V5ttC3sL3WfMBK/tJ80gi0a6xS2y981PmfAByPiIPG/kaxy5441cv2JbS7J6l8GJBEXuIvEe6x+NYp9LYJB5ieo59NaAI2wki1j7/jbrrSOIxalwBxgfl58KMefHkVxdjVPok+yX+8Rm5mnkUlszC5GkAcqUxuIbZQXHVpbQkElSiAABXpXRk+xVtunKCKhTfals5TgbDxAMjvChQRbqR7P4oipZhXw4kLQoKQoApUkggg6EEWIoH0PAa2a4SK7pFHOWuFtUvFcqFAqGa2KTKKfFNJPJjTU2Hn/AEEn0p7qFtIXvfjXlvtYPDqyrWMylC5SJ16RBPP2aCdp6VzhgrxKT3gzRAWDkvyCrGR68asNrY6E4lT/ABLSWx0hSlKM8zKf5aiHa2xDeHV/eqHvTP0rx5ovZJv+IlqiM4tuWp6fStbe2W1h3WWmAQkspcOZRV4lqVJgm05dBApy4iWvSud4HQX2ST/6VnnxzH61zcMlsl9CSFYpGbEx/eAfECryUiCSLE69aphjDFWJC4JT31iBP2/gPieAqw8Zv2y26ttxDichKZABkjhBIIrpYJRUOWUQhtBD7nAggf5RRXY7QVjMMkgGXBI5xf6U3f8AFi8SRoHnAP8ACop+lEt10TtDD9Co+5tRrmpf90Yv1F5EN7MOUbRWkOKPhR5gZRlBPG0X6U0IOdEqUYUnieYonvkP+qO/wNf6aGvmCD1FGo/DlpeoMuyKxaJEc62DXQru1apmhylIAgVruxOaLxFdxWVO1cKuhmooTvLilMpbdBORLgDn8KrZvQwf96L0ljMKl1tTaxKVAg+v1qcibi0uxMB7S2o8woOqAcw5gKygZmzoTb2knUE8+FqNsupWkKSQUqEgjQg1G9i41bbD6HE973Ci2pIiVNptMEX8IVY6hIoju22lCIaVmYX42j92faQegNx6jhfDDN3336+GJBgIrkprjG41thtTrqwhtAlSlGABVLb99qLuIzt4Ylti6dClbg5k/ZSfu2trrA9djol2/Pag1hMzeHAddEjMT+7Sr0usjkPfUG2D2t4htf8AzC+9bUsqVa6eib2TN493Su33ipRJMmkk0ilwegHu0vBLTmD4EgWPhI4mQb8rCtf+P8KhwJ71JCuOgjQ30jrVAmSa7LUEc+XWlQ7PQO0MNhMWRCgV3g5ihaJEHKpJBTMkGDTbFbIeSMhxLuUyJysqMG0Zi3peL1RodWkghakqjUKM2njNhwokrezGd2Gy8ogEEcxlOYCeWlv60qY7Raz+xWXFZnwXyJjvTmAnWECEDQaJrnH7Lwy4BSlKtElEIUI4Ap4DlpVZ4XePFEyp9ZIkESIv6eVc4jbDwM51XJvN/fScb4Y7RN4UyT3bqXgIlJIDgB0/Cr4UthN4EKIy6jUHgeoqr3MaVJuZJgK6xJE9NffSSXlIVKFETcX+FeOehju3QdP2MnFdoup/tKxbbSklhpSjAQ6nOlCRxztKUVSOEKIPEiqg3i229iX1uvr7xZMSdABYBI0SAANKfYbbbjoDShBVx4QL/wBfSgGJRlURfU6/OvVh31U+xq/I5w2KkhOUHoQD76lW6++2KwEtsFPdrM5FnMgK4lMmUk8RNRPZaCVk8hT1DQ0ItP6NajPR25O9CcczmjK4iA4nhJGoPEG9SGqV7GdrBvHLZJ/tWvDyzIvIvaRNunuukUxHQrK1WUAZUf3x20vCJadSkKTnyrmfZIkxGirWPTrUgprtDAtvNltxIUlWoPzB4HrWeRNxai+QYuhQIBGhuPWoT2spzN4ZN/7UmxjRB/OpTtfabeGaK1ECBCUyAVK0SkTzMDpUF3v2qy83hktPtvKStRcKFA+IgEmNQCSYrHUzSxyXmiZdAt/DAN+0rT76vzpJ9QLgNzlaZSBcRlaTqeNyT5HWnOMV4D5UCVtNPfFIEk9YAygAT0gE8dNK4+NNxaXsZjzdZtD+IQEmYcSpSTAIyrBmOIkcKJdoe5i3HRiMMklS7OIBCbgWWJ6CCOcHiajvZs2VY9k8itR9G1fUirhWa6+nxLY0/UtLgp/DSX31ATmdcVM81qP1qQblNE45BIAhKzrP2Y+tCNgMZgVfev7zUm3Na/5w9G1H4pH1rnwd6lP3J8gnfUAbTWePdt/KhWNUaJb/ANtpq/8Ajb+RoPjlOAeFRHUR7ucUtVzmGy7Rjm//AHEfzCl2XkqEpUFDoQflWmhAEVpxhKrlInnx9CLiu0t1FCwNbpuFFHtGU8+I8+Y6/wC9LzTTso3Wqw1qmBG8KwcPtF8/YxCW3ByzgpaUPOIV/iNYcS3s0vl1QRhyO9R0VMLbSOJkpIHU8jRPb77LTYfeUEIaUlWc8JUEx1mRbiYqgu0Xfp7HvEiUMJJDSDYxpmI+8fhpWKx1K/e19RJGb/doT20HCP7Nkew3M+qiLFRHpw84m1iFTMz0+lJjDqJ09afYTCfu803mY6VqUcFkEyeOv5Ui63CraTalUvGQkJJgxYTflbWj+yNw9oYyAjDrbTM946C2gDpmEq/wg0ARhtwAzxFPdl7NdxToQ02tZkZilCllIJjMQOAmffVvbv8AYnhW4ViXHHlDVKT3bZPKwzx6irD2fgG2EhtptLaYgJSIECw6++gCm9jdi2IWScQ4GwFkQkZlKSJ8WY2TNjEEwbxpU02J2U4FpkoeaDxknOoqC41EFJEWHCONTkitp0/XlSGQhrss2cmcrKkm3iLjij/mVHwrHeyrAqbLX7xM/bSpObW11JPAxwnjU3ArTbUdba8aAKp2z2II7lX7O+sugqMOBMK5JkRlPUzrVc7W3OxmDdyPYdwgwApCVKQc2kKAgmbRzr08s++uTNAHlvOGyFAEga845++usW2294km41EQfdVy9o24yMSkvsgpxATEAwhYHAi4kTqL6VRWKK23Vj2VCUn01F/KgB6w2GzbjSjzkRJimDeNKrKseYrjET7RkieNqAH+wNtOMYpp9JGZChE2EE8TwBEiepr0bj988O0ckrccgS20hThBImCpPhB9a8xJKl3GsxHPkLXr0vu5tEtNow61pW4222V6pKUqHhVliFI4FQNjqBrSbZLMG+DivZ2fjCOrYT8zRrZuOLolTTrR+64kD4pJHxmhmOXtEKJZThVI+zKnMxHCTYe6mzW8mIaUBi8IptM/2rZ7xsdVAXSKzUmny3+nBN12SdawASdBUI2r2kpQ/wBw2w4TfxOAtzHFKCMxHUx5VNW3AQCCCCJBFwQeIPEUli8MlwQpKVWIuAYmxielXOMpKouhsrV7enD4t8d8woJSIC24JC1fbJMApSmQBf2jYwKEYrdhODcacbeS+08kqbUBBhMTOo+0PcbCp1isJgWFvqcZQmFICUITBVDaLhKOqok/d6VXLu314p1IShtlpuyG0A5QDHCYmwmAK5uaNQkm1ZLDWLEIPlUPYaUl5KiLEqIPOAZ+FSzGKWGz7JtyP50IxDKe5WqBORR045TXjxSpP34IHHZCzOLJ+60s+8pT9atVSarTscbhzELCSYQhNr+0onTj7HCpPtnGsZwMWo5TJQhJUEWjxSkypRki/swRHFXbxTUYl+CMbtf2Y8hR/dBxKcS4pVgG4ngJUnU8BbWgGwnQG7JVp0/Oje4mPbD75WcgKUgFcAG6jEk9K5OH85ErsBdoX/8ATVB/8tr5Ghe1v7Izy1p/vkE/8ScCIy5W4g2unNaOF+FNNqJ8B8qWplea/cJF4Niw8q6isb0HkK6iu6jQ1FYBFdRWRTGc1hrqKFb3ulGDxCkuFshpRCxEptqJ40AU/wBq2+qcS73bZV3LZUIJgKWCQVkD3CeBOk1WbzxUb6DQaVIMbgwtuAY4+ccSTrUexCMpgafPrSGPsEoEcfI/nxo5uxupiMattDaShC1LBdIkJy3VIBmbiJiZqJpcI0NPtm7TfZXLTzjJV7RbWpuRrfKR+jSGej92NxsHhEJShpK1pIPeLAKsw+10N9aklq86bJ3uxy1hBxzgQVDMpa4gA/eJBPlN6vDYe8eGUEMpxTTrgToHG8xi05UmgA1FaTe/urCZFv1+vpWnFxHQTQBmXXrWagRxrAsCen6PzpNKrAeXxoA7JrYVxpN7j+r8K33iZAHU+n6igDqBPv8Az/OtqV8OFc5x+X6/WtczF6AOXhodUmq47UOzkYkHEYdMPaqA+1Hz9Ksa4tqkkn0Ovx+dbAABkyOfSgDyscM42ShSQCNdJpo+sk391W32jbtpOIVlIT3lwSLZvTmKIbndjbSVF3GLS+CBkSjMEjqefD40IGVvsTdPExhcSEgtvPtttkG+YqnTgISq/CKuPelJb2vhnEarw7qVDmlCVqE+/wDy1LGtjtJ7kJQkJaktpAslRTkzeeUqE/jNC9v7OAU/jF3LeHW22OVlFSvMkhPkDzqMnREjvd5f7Xgm1lS21OJ8Sm1FBCgYKkxYSRMdTQ3EYvGbPVndWcVhSRKo/etg8THtD9WozuVgy1gmEEQcuYg8M5Ko+NFlIkQbg6g1Ki5RTunQqbSOMMtKkJUggpUApJGhBuCPfTXbW0gwgHKVrWpLbaBqtatB0AAKieCUqPCnODwqWkBCLJTZI5CbDyGg8q0cKC4HDcpBCemb2j5mAPIdTOvNFEB2hsN5zEFpJzuSFOuRAJVeSeCUpISlP4bamoZh9kqYesFd0oq7pahBcQk5c4HI6jz41eYYAmw8Rk9bRf0tVfdpCh+1sjSGvms/lXN1Gn2Y5SvlshqkCsf/AGZ8qEbRth1/wR77UV2god2fL6UI205GHXfkPiBXgx+PmiCSdjLMM4hfNaE/ypJ/76X7SMNdpVgnxDjOa0kwRwj3U47J2gnAlWmZ1ap6AJT9DQHfveTv/ClMNoX4HNSuxCiJEBMj4cLgdjJXwkmW+hHZZhr0pDB7FfxSlhnJAHiK1ZQAeM8hxjmK7w9mqlnZzhUrZfC0JWlSwCFAKBGXiDY61zcEFLMov3JStkN2xs3uHEo7xLyk5RnSbKEE69IArjHoUUaDTrRbfDCIRje7bQhtCUghCAEpGbjCbCbn1NIYxCS1mBkEG9ZahVPjwwaLga0HkK7FcM+yPIUpX0K6NTKysmspgZUW7UnVJ2e6Ej2soUeScwJ98R61KZpht7ZwxGHcZIHjSQJ58DbrQB5sxj6Um5uRPoOFC8bhyYJ9pRsOSRxPKie8GzX8O+pt9opVMCRAKZ1HOaTZQla/n79KQwXjWEtpAjxG/kPzpoQaM7VhQNo8UD0/rTfENJSEmJJoAbMG0cyPPrRXZO0FtLCozAGwtPnJBvTNOHLfiPKw86XQrwzpekBfXZ3vd+3MrJSQWyE+IglcJBJgaXVH1qTPrAzKVwHyql+xvFpRi1ibFuIJiVZhAHXSrgchSkpOhMnrA/M0DN4V4OIJ4G0addK7dxAifsxc+Yt8z7q5UlKVKGnER8fn8abPuwA0BmJBHv0NAHbrhcyCCmDPqAIHzrTrveEoggxc8gqfpWn1+EwYKIOnOB6jWuXgoGQQFlMAcDBH5mgZ2lBSmyiYEQbmR1Ovl1pU4op8RHgMC2oJ5jzpJuCQTqBJHn+vgKTexGUysfuydfuq0E9LfGgQvhNopXCR7SfaGhHD9f1rSsTEKIhFwTwB68h1pr3ULSsGFQZ0mOFuP65VvBtEpKScyFEnrry/WlAA7e/BB5olIum/lFxpRjczFd5h09K002EjgYBBHlyn5Gkd2GlNuvINgTmEWBB6U0DJFSGOwodRkVdJIzDmAZjyMQehNL1k0NWqZJlZWVlMDKysmtTQBo1WfaS4Rj24BMMJ5ffcqzDVY9oRnaPkyj/Us/WvFrvyWKfQK2niFZD4Fafh/Og+32QGTdWqeJPHrRraP9mfKg+8x/dD+IfU1ycV2vmZEpwedvYbaECVvSkHl3r2WT08QEcaAdpTQQ4Gk+y3kbT5JRf1kk+tWBuhh0LwTCSoKypakfdUjK4EkcL+K/3qiXa9h0pUyQLuFaj/AIQgfWutljLbFr2La4GSX0d0AFJ05il93dolkrWhYClWBKlQMt7hMyDPpF9aYPMwIjT6UzdcOWOAJJGmaACfcP8AUANZHMg6nceyAhtjaCsRiiteXxJQIRpAFtSZ/rTjH4tORQzggSOUfnytyoL38qzFMEhKUhIiwEAkDpE09xmGSlGYoUTFhaE6nSdaWX8UrY2W7hNttrSju0uOSkGEoVa3FSoSk9CZomhUgGI6Hh7qZ7PUhLaEpASkJEAQBHQaC9OEufl7v9q7sZWuzUWmsmkXHgm50rEPAmAdNareroBaayaQdfCdTHWth0THMSPr+utG5XVgRvf3cpGPSFpVkeQISoyRGsECqT2vsh3COqQ6gpV1FjbnpOtej0u3I5R8aA7+YIPYeClKglQJkA29aNyqxo8+FEZioeEmmq1nMYulOlTbbG6QXJaVlJnwn2fIcqBu7t4hKbN2GpEH5a0Wh0RwOOKM3+lO1ORSyyWpzpKbcRGv50zOKBgBMqpiDu6zqhiG1IEQ4kFV4E294En0nhV9NPaSq4AAnU2/V6887L3hxKPCyEpCeOQHrJJ48qc4vfnHgj/mVSBEgIE+iRBjmRNAF/Nuk+M6FKR6E10rSYhU/L+k159d33x60gqxTgCTMJKUXmdUpHHhpRzZHajjGkgkpfCBEOJhRA/EgiSBxIkxRQ7LoUkOAg2E5Z0mD+j7q4ZC1rJVoB4SOfOKim6e/jWNQpqwxEFSkpkJiwzJUdfnepcXSQMtra9YtSA4zqCVLV104EGh+0tsssobViXW20Kt4jEny40G7Qd4jhMJ3zayHHPCmIMk8wbGIvxvVFPOuOqK3FqWeKlEqMevyphZcWM7UsM1iAhKy4ykWcbQrXighQBV/EDGlO8P2n4ED2XUyZui44yInp76pDDxm0KgOHOi7GGChmIgjhy6daKFZcGP7UdnobDmdS13ypQhSVkjgQoAJvGpjlNRZPbcULzIwcwCBmd4E8gj61ANpjW1+f8AtwoYkCbz1GlMC5dldvCSoB/CFKT9ptzMR/gWEz/NVjbu70YXGpKsO8F5faTBStP8SFAKA6xBrzIgsmDOn3rU+wGLDag4wtSHALLQpSVD1Bn0oA9RzWTUA7KN+3cchbOICe+bAOcWzpNsxSLBU6xAuIFTzNSEdzWTXGauVOfOPpQ3QChVVX79qnaKujTY+Z+tWT3gMjW35/lVWb1ePHPkFRIKUXH3Ujjy1E8wZrwa6aWOn5ZM+httBfgNAt5HJSkfi+hori1SMhMKNvXlf4UH2hh1FxpM5s6o42mACIrnYq3IzLH7LmynDOf/ACmPRCBQLtfX++ww5NuH+ZSf/wA1LN1sreHQmQfDmUQSRmVdR5kAz7qjm+2GD2IQo6JZSLTqVKVr5RXQephHDTZp/aC8a3dIH2lX87AD5+/pSmE2N3qJi3sj8QB8RgiPamNZkilMQ8ktBY1EH3KMfBVbwG1MmVH3Sr4qKvneuLDI7Ta6ZFGn9jd2sggJPhVA8kzHMDvE24ZetZtUSEpGgBUfQE++BFKbX2yh54LSCITef4Ug/FKfdTRvHiQToVEfKnmb3vb0EuET7AYxSGWVqjJlAVe4lPxEx+prhzand5VJMjxqKeBA4j7pEnpziZqOu7cCsM2gCICgfPNb5UGwu3iP8w/wqmRXolqZriLukvo/I5OkT3G7ZSpKihQskL1jlA8wT8KFp21BiSIStbSgLiCdU8Uyi45ZrWERBO07mBAMwOpgmsS6ox4vZUoJnQQqfd4lGs3myOe6Q4uye4zb2bDpeEe3EclCZF7EaX5GkdnbVzpPiAUgqy9W4keZT4ROsRrcGGnGkt92CYUM8cAVWt6D413/AMQPgA5uD+eT9E+6iWoyNtg3yTbZ+3cylE+2QgR+KVDTkE38x1p/tLxpLQuTIueKQFfX4Cq8bx+RxRHH52/OiD+9WR5DgByiSB/E2Ex70itMGqmqUn5X6PlgmPXcAMkTKsxn3xA9SBQrbJLCVSnMs2Q2DdRkADykgmt4TbEKaKpIsVdSDmmkNo40OOBxQkgwJ4R4lHzMD3Ctnr2+a5L3srvaWy3Xnc5MlYKiq+UZbKg/cGoPEUm7s1LaJTJKzkTwJAErPSfCPIqFTpOGzlWiUEIBSALBMGPIxEfhFIYzYzfdhPK6fLKTx6ke4VvH7Qi6T7sW4hAw8Jyzblp/vSH7EBKjbjepvit10GZJiTMc8oMCdBKT7/WhOP3VdUUwpImTqcogxcGTqRMTrYHh6Ya7DLyCaIyMSg6g+VK4d9IEBJTmFjwqWYzciW02ShaSM1h4hpYAwk9Jjyrr/wAOheVMDwkgDSCpNjI4SggjqDwuffcNWpDtEEwzqm1hSSUkGyhIIPOvQO5m2VYjBtuarAhSj94cfKq7TuwtKXRaERBtqPaJE3RcnLxDYFyZqUbktHCpcbJsrKSASUyUgkpH2ZzC3SbTlTP3/F6gmDO1DaAcCMORCkEuHlBKkfQmoFjsLDQSgRJ04n9Xt0qf7a2Ql7ELfmwAEH8MKSPUC/Q86ZYTYasicxlSiokKOaCPCjKeEHXScyjMxCevx1aE5IgeysKSQSDExIBNF1YRSB4upmbGdIqVr3eEkpOWAJAsJJmLfZJkeQjqXqNlISnKsCNBE2CuHmCScwj2vOcpfakFyhbiCIw5KkSCc0FI9YnoJ/VjCaMI0M2aJJBIOozC0fH9GpwxstlABA9nwJN5AAINxqZKjPMzXGJ2GyhSn/tkkkapVMcIt4oVrqkczUf8nBuqY1MgqtihDWd2QpUgJGs2hIHEmQfWkNn4ZxHeSm4AsZ1zoT/31YzmyGu8QV3jMtIji4EzJ4EEWI0tXI2a3nXn8QVEiNM8KgHzQDPM0L7UjXXPf+Q3cA3swxbrOLCkCQ4EpymNHCoiDwnIDHUVcK9qoyqPITrBvaPMHWquwTPdISgkd54ipSRF1FVxOkcPppT5G2FZl31zH+YX+VefLrJOTcV/OibLAe2oUEwZTMAq0kRMngJIE3j4hsnbqVOBExCzmzWKYSoqB8p16VEW9slaPFc5io8jm1HxNC2to/vCZJ1BJ1I0v1is/veR2l62PksJrbI70kmGzlBtcQFqB6WGnIVD3XQvvHhPiWpRjWFHX3Wpg5tYqHHUE+5X500wuP8A3Kk/hH5/QVjklkyRp+v7iCikpNzBKSI9TE8zoT79OGsOB3iyQmEiUgCIm3kOOl+NDmsbKB0gnqJj5qra8XCzfhJ6yJPzNZ7JdCfZJMJtLL4EkCcsa8tOnD3mksU9LhIIkgHhlA1gT5/Co4vFSrUjQ/l8qUZxRU4ZPA/Sk8cqGf/Z', alt: 'Image Alternative'});

    const urlRef = useRef();
    const altRef = useRef();

    const handleChange = () => {
        setCurItem({
            url: urlRef.current.value,
            alt: altRef.current.value
        })
    }

    const getList = async () => {
        const request = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (request.ok) {
            const result = await request.json();
            const json = result.slice(0, 20);
            setList(json);
        }
    }

    const handleItem = (item) => {
        const { url, title, id } = item;
        setCurItem({url, alt: title, id});
    }

    const handleApply = (item) => {
        handleImageChange(item);
        handleImageMenu();
    }

    useEffect(() => {
        getList();
    }, [])

    const renderImages = () => {
        return list.map(item => {
            return <li key={item.id} onClick={() => handleItem(item)}><img src={item.url} alt={item.title}></img></li>
        })
    }

    return (
        <div className="confirm-wrapper">
            <div className="confirm-menu">
                <div className="confirm-menu__header">
                    <span className="confirm-menu__header__title">Image Gallery</span>
                    <div className="confirm-menu__header__close-btn"
                        onClick={() => handleImageMenu()}>x</div>
                </div>
                <div className="confirm-menu__content">
                    <div className="confirm-menu__content__image-src">
                        <label>
                            Image URL
                            <input ref={urlRef} type="url" onChange={() => (handleChange())} value={curItem.url}></input>
                        </label>
                        <label>
                            Image alt
                            <input ref={altRef} type="text" onChange={() => (handleChange())} value={curItem.alt}></input>
                        </label>
                        {<img src={curItem.url} alt={curItem.title}></img>}
                    </div>
                    <div className="confirm-menu__content__images">
                        <ul>
                            {renderImages()}
                        </ul>
                    </div>
                </div>
                <div className="confirm-menu__bottom-btns">
                    <button className="upload-btn" type="button">UPLOAD IMAGE</button>
                    <div className="confirm-menu__bottom-btns__confirm">
                        <button 
                            className="cancel-btn" 
                            type="button"
                            onClick={() => handleImageMenu()}>CANCEL</button>
                        <button 
                            className="apply-btn" 
                            type="button"
                            onClick={() => handleApply(curItem)}>APPLY</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageMenu;