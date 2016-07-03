package test1;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class test_chief extends SeleneseTestCase {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		//selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:9000/");
		selenium = new DefaultSelenium("localhost", 4444, "*googlechrome", "http://localhost:9000/");
		selenium.start();
	}

	@Test
	public void testTest_chief() throws Exception {
		selenium.open("/");
		selenium.type("id=name", "test_chief");
		selenium.type("id=password", "test_chief");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.addSelection("id=waiting-list", "label=dish3");
		selenium.click("css=button.btn.btn-default");
		assertEquals("�ӵ��ɹ�", selenium.getAlert());
		selenium.addSelection("id=waiting-list", "label=dish2");
		selenium.click("link=ѡ��");
		selenium.click("css=div.col-md-6.body-main");
		selenium.click("css=button.btn.btn-default");
		assertEquals("�ӵ��ɹ�", selenium.getAlert());
		selenium.click("link=ѡ��");
		selenium.click("link=�ӵ�");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=��ҳ");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=ѡ��");
		selenium.click("link=�ǳ�");
		selenium.waitForPageToLoad("30000");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
