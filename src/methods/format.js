const format = {
  date: (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    let h = date.getHours();

    let hf = (h > 11) ? 'PM' : 'AM';
    let hh = (h > 12) ? h%12 : h;
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if(d<10)d='0'+d;
    if(m<10)m='0'+m;
    if(hh<10)hh='0'+hh;
    if(mm<10)mm='0'+mm;
    if(ss<10)ss='0'+ss;

    return {date: m+'/'+d+'/'+y, time:hh+':'+mm+':'+ss+' '+hf};
  },
  number:  n => Number(n.replace(/\D/g, '')) || '',
  percent: p => {let n = Number(p.replace(/\D/g, '')); return (!n || n < 0) ? 0 : n > 100 ? 100 : n},
  phone:   p => p.replace(/\D/g, '').replace(/(^\d{3})(\d{3})(\d{4})(\d*)/,(m,a,b,c,d)=>'('+a+') '+b+' - '+c+(d ? ' - '+d : '')),
  ssn:     s => s.replace(/(^\d{3})(\d{2})(\d{4})/,(m,a,b,c)=>a+' - '+b+' - '+c),
  ein:     e => e.replace(/(^\d{2})(\d{7})/,(m,a,b)=>a+' - '+b),
  name:    s => s.replace(/^\s+/, '').replace(/\s{2,}/g, ' ').split(' ').map((n)=>n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
  first:   s => s.charAt(0).toUpperCase() + s.slice(1),
  search:  s => s.replace(/[^\w\s]/gi, (m, a)=>'\\'+m),
  money:   s => s.replace(/\D/g, '').replace(/[\d]{1,2}$/, m =>'.'+m).replace(/^\d*/, m=>+m) || '',
  url:     s => s.toLowerCase().trim().replace(/\s+/g,'_'),
  string:  s => s.replace(/[^\w\s]/g, ''),
  letters: s => s.replace(/[^a-zA-Z ]/gi, ''),
}

export default format;
