<template>
        <svg fill="#00cc63" width="150px" height="150px" viewBox="-3.2 -3.2 38.40 38.40" id="icon" xmlns="http://www.w3.org/2000/svg" stroke="#00cc63" stroke-width="0.00032" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)">
                <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="19.2" fill="#000000" strokewidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.256"></g><g id="SVGRepo_iconCarrier"><defs></defs><title>iot--platform</title><path d="M30,19H26V15H24v9H8V8l9-.0009V6H13V2H11V6H8A2.002,2.002,0,0,0,6,8v3H2v2H6v6H2v2H6v3a2.0023,2.0023,0,0,0,2,2h3v4h2V26h6v4h2V26h3a2.0027,2.0027,0,0,0,2-2V21h4Z"></path><path d="M21,21H11V11H21Zm-8-2h6V13H13Z"></path><path d="M31,13H29A10.0117,10.0117,0,0,0,19,3V1A12.0131,12.0131,0,0,1,31,13Z"></path><path d="M26,13H24a5.0059,5.0059,0,0,0-5-5V6A7.0085,7.0085,0,0,1,26,13Z"></path><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"></rect></g>
        </svg>
        </template>
<script>
export default {

}
</script>
<style>
.cls-1{
    fill:none;
}

#icon{
  text-align: center;
  animation: glow-animate 5s linear infinite;
  
  border-radius: 50%;
}

@keyframes glow-animate {
  0% {
    opacity: 1;
    transform: rotate3d(1,1,1, 0deg) scale(1,1);
    box-shadow: 5px 3px 3px #00cc63;
  }
  25% {
    opacity: .3;
    transform: rotate3d(-1.01, 0.9, 1, 45deg);
    box-shadow: 12px 6px 6px #00cc63;
  }
  50% {
    opacity: .9;
    transform: rotate3d(-1.01, 0.9, 1, 45deg) scale(1.1,1.1);
    box-shadow: 10px 3px 4px #200636;
  }
  
  
  75% {
    opacity: .75;
    transform: rotate3d(-1.01, 0.9, 1, 30deg) scale(0.8,0.8);

  }

  90% {
    opacity: .8;
    transform: rotate3d(-1.01, 0.9, 1, 15deg); 

  }

  100% {
    opacity: 1;
    transform: rotate3d(1, 1, 1, 0deg);
    box-shadow: 5px 3px 3px #00cc63;
    
  }
}

</style>