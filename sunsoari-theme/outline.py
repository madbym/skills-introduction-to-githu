import json,sys,re
def load(p):
    s=open(p).read(); s=s[s.index('{'):] if s.lstrip().startswith('/*') else s
    return json.loads(s)
def walk(blocks,order,ind,full):
    for k in order:
        b=blocks[k]; s=b.get('settings',{})
        extra=''
        if full:
            txt={kk:(str(v)[:int(__import__('os').environ.get('W','70'))]) for kk,v in s.items() if isinstance(v,(str,int,list)) and v not in ('',None) and kk in('text','title','heading','image','label','quantity','discount_percentage','product','products','product_list','collection','cross_sell_products','badge','product_small_title','description')}
            extra=str(txt) if txt else ''
        print('  '*ind+b['type'],'['+b.get('name','')+']' if b.get('name') else '',extra,'(OFF)' if b.get('disabled') else '')
        if 'blocks' in b: walk(b['blocks'],b.get('block_order',list(b['blocks'])),ind+1,full)
p=sys.argv[1]; full=len(sys.argv)>2
t=load(p)
for sk in t['order']:
    s=t['sections'][sk]
    print('SECTION',sk,s['type'],'(OFF)' if s.get('disabled') else '')
    if 'blocks' in s: walk(s['blocks'],s.get('block_order',list(s['blocks'])),1,full)
